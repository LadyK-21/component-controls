# Table of contents

-   [In action](#in-action)
-   [Overview](#overview)
-   [API](#api)
    -   [<ins>onRenderBody</ins>](#insonrenderbodyins)
    -   [<ins>onPreRenderHTML</ins>](#insonprerenderhtmlins)
    -   [<ins>Helmet</ins>](#inshelmetins)
    -   [<ins>GatsbyLink</ins>](#insgatsbylinkins)
    -   [<ins>Layout</ins>](#inslayoutins)
    -   [<ins>DefaultName</ins>](#insdefaultnameins)
    -   [<ins>CategoryPage</ins>](#inscategorypageins)
    -   [<ins>DocHome</ins>](#insdochomeins)
    -   [<ins>DocPage</ins>](#insdocpageins)

# In action

[Example site](https://components-storybook-6-no-docs.netlify.app/?path=/docs-test/components-actioncontainer--overview)

# Overview

Gatsby theme for documenting your projects with component controls

-   Gatsby theme quick start.
-   Full UI configurability with components shadowing.

Special thanks for the inspiration drawn from [Gatsby themes](https://github.com/LekoArts/gatsby-themes).

[Getting started with gatsby](https://component-controls.com/tutorial/getting-started/gatsby)

# API

<react-docgen-typescript path="./src" exclude="Store.tsx" />

<!-- START-REACT-DOCGEN-TYPESCRIPT -->

## <ins>onRenderBody</ins>

_onRenderBody [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/gatsby-ssr.tsx)_

## <ins>onPreRenderHTML</ins>

_onPreRenderHTML [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/gatsby-ssr.tsx)_

## <ins>Helmet</ins>

_Helmet [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/index.ts)_

## <ins>GatsbyLink</ins>

_GatsbyLink [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/components/GatsbyLink.tsx)_

### properties

| Name  | Type                                                                         | Description |
| ----- | ---------------------------------------------------------------------------- | ----------- |
| `ref` | _((instance: HTMLAnchorElement) => void) \| RefObject&lt;HTMLAnchorElement>_ |             |
| `to`  | _string_                                                                     |             |

## <ins>Layout</ins>

_Layout [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/components/Layout.tsx)_

### properties

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| `docId`     | _string_ |             |
| `storyId`   | _string_ |             |
| `activeTab` | _string_ |             |

## <ins>DefaultName</ins>

_DefaultName [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/pages/404.tsx)_

## <ins>CategoryPage</ins>

_CategoryPage [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/templates/CategoryPage.tsx)_

### properties

| Name           | Type                                                  | Description |
| -------------- | ----------------------------------------------------- | ----------- |
| `pageContext*` | _{ type: string; category: string; docId?: string; }_ |             |

## <ins>DocHome</ins>

_DocHome [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/templates/DocHome.tsx)_

### properties

| Name           | Type                                                  | Description |
| -------------- | ----------------------------------------------------- | ----------- |
| `pageContext*` | _{ type: string; docId?: string; storyId?: string; }_ |             |

## <ins>DocPage</ins>

_DocPage [source code](https://github.com/ccontrols/component-controls/tree/master/integrations/gatsby-theme-stories/src/templates/DocPage.tsx)_

### properties

| Name           | Type                                                                                         | Description |
| -------------- | -------------------------------------------------------------------------------------------- | ----------- |
| `pageContext*` | _{ docId?: string; storyId?: string; type: string; activeTab?: string; category?: string; }_ |             |

<!-- END-REACT-DOCGEN-TYPESCRIPT -->
