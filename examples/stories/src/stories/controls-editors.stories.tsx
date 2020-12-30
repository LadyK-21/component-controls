import React from 'react';
import {
  Document,
  Example,
  ComponentControlNumber,
  ControlTypes,
  faker,
} from '@component-controls/core';
import { useControl } from '@component-controls/store';

export default {
  title: 'ESM/Controls',
  author: 'atanasster',
  order: 2,
} as Document;

export const textDefaultProp: Example<{ text: string }> = ({ text }) => (
  <div>{text}</div>
);
textDefaultProp.description =
  'A simple story that just returns the text parameter';

textDefaultProp.controls = {
  text: { type: ControlTypes.TEXT, value: 'Hello' },
};

export const kitchenSink: Example<any> = ({
  userName,
  age,
  fruit,
  otherFruit,
  dollars,
  years,
  backgroundColor,
  color,
  items,
  otherStyles,
  nice,
  images,
  dog,
  birthday,
}) => {
  const intro = `My name is ${userName}, I'm ${age} years old, and my favorite fruit is ${fruit}. I also enjoy ${otherFruit}, and hanging out with my dog ${dog.label}`;
  const style = { backgroundColor, color, ...otherStyles };
  const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };

  return (
    <div style={style}>
      <p>{intro}</p>
      <p>
        My birthday is:{' '}
        {new Date(birthday).toLocaleDateString('en-US', dateOptions)} at:
        {new Date(birthday).toLocaleTimeString()}
      </p>
      <p>I live in NY for {years} years.</p>
      <p>My wallet contains: ${parseFloat(dollars).toFixed(2)}</p>
      <p>In my backpack, I have:</p>
      <ul>
        {items && items.map(item => <li key={item.name}>{item.name}</li>)}
      </ul>
      <p>{salutation}</p>
      <p>
        When I am happy I look like this: <img src={images[0]} alt="happy" />
      </p>
    </div>
  );
};

const arrayOfObjects = [
  {
    label: 'Sparky',
    dogParent: 'Matthew',
    location: 'Austin',
  },
  {
    label: 'Juniper',
    dogParent: 'Joshua',
    location: 'Austin',
  },
];
const GROUP_IDS = {
  DISPLAY: 'Display',
  GENERAL: 'General',
  FAVORITES: 'Favorites',
};

kitchenSink.description = 'Complex story with a variety of control types.';

kitchenSink.controls = {
  userName: {
    type: ControlTypes.TEXT,
    label: 'Name',
    value: 'Storyteller',
    groupId: GROUP_IDS.GENERAL,
  },
  age: {
    type: ControlTypes.NUMBER,
    label: 'Age',
    value: 78,
    range: true,
    min: 0,
    max: 90,
    step: 5,
    groupId: GROUP_IDS.GENERAL,
  },
  birthday: {
    type: ControlTypes.DATE,
    label: 'Birthday',
    value: new Date(1990, 1, 1),
    groupId: GROUP_IDS.GENERAL,
  },
  dollars: {
    type: ControlTypes.NUMBER,
    label: 'Dollars',
    value: 12.5,
    min: 0,
    max: 100,
    step: 0.01,
    groupId: GROUP_IDS.GENERAL,
  },
  years: {
    type: ControlTypes.NUMBER,
    label: 'Years in NY',
    value: 9,
    groupId: GROUP_IDS.GENERAL,
  },
  nice: {
    type: ControlTypes.BOOLEAN,
    label: 'Nice',
    value: true,
    groupId: GROUP_IDS.FAVORITES,
  },
  items: {
    type: ControlTypes.ARRAY,
    label: 'Items',
    rowType: {
      name: { type: ControlTypes.TEXT },
    },
    value: [{ name: 'Laptop' }, { name: 'Book' }, { name: 'Whiskey' }],
    groupId: GROUP_IDS.FAVORITES,
  },

  fruit: {
    type: ControlTypes.OPTIONS,
    label: 'Fruit',
    value: 'apple',
    options: {
      Apple: 'apple',
      Banana: 'banana',
      Cherry: 'cherry',
    },
    groupId: GROUP_IDS.FAVORITES,
  },
  otherFruit: {
    type: ControlTypes.OPTIONS,
    label: 'Other Fruit',
    value: 'watermelon',
    options: {
      Kiwi: 'kiwi',
      Guava: 'guava',
      Watermelon: 'watermelon',
    },
    display: 'radio',
    groupId: GROUP_IDS.FAVORITES,
  },
  dog: {
    type: ControlTypes.OPTIONS,
    options: arrayOfObjects,
    value: arrayOfObjects[0],
    groupId: GROUP_IDS.FAVORITES,
  },
  backgroundColor: {
    type: ControlTypes.COLOR,
    value: '#dedede',
    groupId: GROUP_IDS.DISPLAY,
  },

  color: {
    type: ControlTypes.COLOR,
    value: '#000000',
    groupId: GROUP_IDS.DISPLAY,
  },

  otherStyles: {
    type: ControlTypes.OBJECT,
    label: 'Styles',
    value: {
      // do not randomize the border style
      border: {
        type: ControlTypes.TEXT,
        value: '2px dashed silver',
        data: null,
      },
      borderRadius: { type: ControlTypes.NUMBER, value: 10 },
      padding: { type: ControlTypes.NUMBER, value: 10 },
    },
    groupId: GROUP_IDS.DISPLAY,
  },
  images: {
    type: ControlTypes.FILES,
    label: 'Happy Picture',
    accept: 'image/*',
    value: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiARwMCyEWcOFPAAAAP0lEQVQoz8WQMQoAIAwDL/7/z3GwghSp4KDZyiUpBMCYUgd8rehtH16/l3XewgU2KAzapjXBbNFaPS6lDMlKB6OiDv3iAH1OAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAxLTI4VDEyOjExOjMzLTA3OjAwlAHQBgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMS0yOFQxMjoxMTozMy0wNzowMOVcaLoAAAAASUVORK5CYII=',
    ],
    groupId: GROUP_IDS.DISPLAY,
  },

  hidden: { type: ControlTypes.TEXT, hidden: true },
};

export const XssSafety: Example<{ content: string }> = ({ content }) => (
  <div
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  />
);

XssSafety.storyName = 'XSS safety';

XssSafety.controls = {
  content: {
    type: ControlTypes.TEXT,
    label: 'Rendered string',
    value: '<img src="x" onerror="alert(\'XSS Attack\')" >',
    escapeValue: true,
  },
};

export const generateRandomData: Example<{ street: string }> = ({ street }) => (
  <div>{street}</div>
);

generateRandomData.description =
  'Story using the `data` field of `controls` to generate **streetAddress** random data.';

generateRandomData.controls = {
  street: {
    type: ControlTypes.TEXT,
    label: 'Street',
    value: '30333 Atlantic Ave.',
    // reference: https://github.com/marak/Faker.js/
    data: { name: 'address.streetAddress' },
  },
};

export const randomNumber: Example<{ number: number }> = ({ number }) => (
  <div>{number}</div>
);

randomNumber.description =
  'Story using the `data` field of `controls` to generate random **number** with **min/max** parameters.';

randomNumber.controls = {
  number: {
    type: ControlTypes.NUMBER,
    label: 'A number',
    value: 10,
    // reference: https://github.com/marak/Faker.js/
    data: { name: 'random.number', options: { min: 50, max: 100 } },
  },
};

export const groupedControls: Example<{
  age: number;
  name: string;
  message: string;
}> = ({ age, name, message }) => {
  const content = `
    I am ${name} and I'm ${age} years old.
    ${message}
  `;

  return <div>{content}</div>;
};

const personalGroupId = 'personal info';
const generalGroupId = 'general info';

groupedControls.description = 'Controls grouped in multiple tabs.';
groupedControls.controls = {
  name: {
    type: ControlTypes.TEXT,
    label: 'Name',
    value: 'James',
    groupId: personalGroupId,
  },
  age: {
    type: ControlTypes.NUMBER,
    label: 'Age',
    value: 35,
    groupId: personalGroupId,
  },
  message: {
    type: ControlTypes.TEXT,
    label: 'Mesage',
    value: 'Hello!',
    groupId: generalGroupId,
  },
};

export const orderControls: Example<{
  age: number;
  name: string;
  message: string;
}> = ({ age, name, message }) => {
  const content = `
    I am ${name} and I'm ${age} years old.
    ${message}
  `;

  return <div>{content}</div>;
};

orderControls.description = 'Controls grouped in multiple tabs.';

orderControls.controls = {
  name: {
    type: ControlTypes.TEXT,
    label: 'Name',
    value: 'James',
    order: 3,
  },
  age: {
    type: ControlTypes.NUMBER,
    label: 'Age',
    value: 35,
  },
  message: {
    type: ControlTypes.TEXT,
    label: 'Mesage',
    value: 'Hello!',
    order: 0,
  },
};

interface HooksProps {
  numberProp: number;
}

export const withHooks: Example<HooksProps> = ({ numberProp }) => {
  const [control, setValue] = useControl<ComponentControlNumber>('numberProp');
  return (
    <button
      onClick={() =>
        setValue(faker.random.number({ min: control.min, max: control.max }))
      }
    >{`Click me to change: ${numberProp}`}</button>
  );
};

withHooks.description =
  "Dynamic controls - you can update the control's value directly from a hook in the story function.";

withHooks.controls = {
  numberProp: {
    type: ControlTypes.NUMBER,
    value: 20,
    min: 10,
    max: 50,
  },
};
