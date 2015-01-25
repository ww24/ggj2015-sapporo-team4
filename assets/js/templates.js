window.templates = {

  "leftHand": {
    pos: {
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0
    },
    type: 'b2_staticBody',
    shape: 'box',
    fixture: 'hand'
  },
  "rightHand": {
    pos: {
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0
    },
    type: 'b2_staticBody',
    shape: 'box',
    fixture: 'hand'
  },
  "jk": {
    src: "jk",
    pos: {
      x: 1600,
      y: 10,
      w: 1,
      h: 1,
      angle: 0
    },
    type: 'b2_dynamicBody',
    shape: 'box',
    fixture: 'jk'
  },
  "money": [
    {
      pos: {
        x: 300,
        y: 800,
        w: 140,
        h: 120,
        angle: 0
      },
      type: 'b2_staticBody',
      shape: 'box',
      fixture: 'hand'
    },
    {
      pos: {
        x: 1500,
        y: 200,
        w: 140,
        h: 120,
        angle: 0
      },
      type: 'b2_staticBody',
      shape: 'box',
      fixture: 'hand'
    }
  ],
  "hazard": [
    {
      pos: {
        x: 1000,
        y: 800,
        w: 135,
        h: 135,
        angle: 0
      },
      type: 'b2_staticBody',
      shape: 'box',
      fixture: 'hazard'
    },
    {
      pos: {
        x: 500,
        y: 400,
        w: 159,
        h: 159,
        angle: 0
      },
      type: 'b2_staticBody',
      shape: 'box',
      fixture: 'hazard'
    },
    {
      pos: {
        x: 900,
        y: 100,
        w: 159,
        h: 93,
        angle: 0
      },
      type: 'b2_staticBody',
      shape: 'box',
      fixture: 'hazard'
    }
  ]
};
