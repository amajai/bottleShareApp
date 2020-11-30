export let uuid = "";
export let ucid = "";

export const setUniqueValue = (u) => {
  uuid = u;
};

export const setUniqueChannelValue = (u) => {
  ucid = u;
};

export const mainButtonLinksData = [
  {
    name: 'Channels',
    navigation: 'Channels'
  },
  {
    name: 'Members',
    navigation: 'Members'
  }
]