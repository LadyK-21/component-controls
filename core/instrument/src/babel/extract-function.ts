import { Story, Example } from '@component-controls/core';
import traverse, { NodePath } from '@babel/traverse';
import { File, FunctionDeclaration, VariableDeclarator } from '@babel/types';
import { extractFunctionParameters } from './extract-function-parameters';
import { followStoryImport } from './follow-imports';
import { sourceLocation } from '../misc/source-location';
import { InstrumentOptions } from '../types';

export const extractFunction = (
  ast: File,
  _options: InstrumentOptions,
  { source, filePath }: { source: string; filePath: string },
  path: NodePath,
  declaration: VariableDeclarator | FunctionDeclaration,
  name: string,
  template: Example | undefined,
  locals: Record<string, any>,
): Story | undefined => {
  if (declaration.type === 'VariableDeclarator' && declaration.init) {
    switch (declaration.init.type) {
      case 'ArrowFunctionExpression': {
        const el = declaration.init.body;
        const story: Story = {
          loc: sourceLocation(el.loc),
          name,
          id: name,
        };
        traverse(path.node, extractFunctionParameters(story), path.scope);
        return story;
      }
      case 'Identifier': {
        return followStoryImport(
          name,
          declaration.init.name,
          filePath,
          source,
          _options,
        );
      }
      case 'ObjectExpression': {
        if (template) {
          const story: Story = {
            name,
            id: name,
            loc: template.loc,
            arguments: template.arguments,
          };
          return story;
        }
        break;
      }
      case 'CallExpression': {
        //template.bind
        const callee: any = declaration.init.callee;
        if (callee.property?.name === 'bind') {
          const calleeFn = callee.object;
          if (calleeFn?.name) {
            const template = locals[calleeFn.name];
            if (template) {
              const story: Story = {
                loc: template.loc,
                name,
                id: name,
                arguments: template.arguments,
              };
              return story;
            }
          }
        }
      }
    }
  } else if (declaration.type === 'FunctionDeclaration') {
    const story: Story = {
      loc: sourceLocation(declaration.body.loc),
      name,
      id: name,
    };
    traverse(path.node, extractFunctionParameters(story), path.scope);
    return story;
  }
  return undefined;
};

export const extractVarFunction = (
  ast: File,
  _options: InstrumentOptions,
  { source, filePath }: { source: string; filePath: string },
  path: any,
  template: Example | undefined,
  locals: Record<string, any>,
): Story | undefined => {
  const { declarations } = path.node;
  if (Array.isArray(declarations) && declarations.length > 0) {
    const declaration = declarations[0];
    if (declaration) {
      const name = declaration.id.name;

      const story = extractFunction(
        ast,
        _options,
        { source, filePath },
        path,
        declaration,
        name,
        template,
        locals,
      );
      if (story && story.name) {
        return story;
      }
    }
  }
  return undefined;
};
