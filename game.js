const textElement = document.getElementById('text');
const optionBtns = document.getElementById('option-buttons');

let state = {}

function startGame() {
    state = {}
    showTextNode(0)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Clear the media container before appending the new media element
  const mediaContainer = document.querySelector('.media');
  while (mediaContainer.firstChild) {
    mediaContainer.removeChild(mediaContainer.firstChild);
  }

  // Display the media in the media container
  const mediaElement = createMediaElement(textNode.media);
  mediaContainer.appendChild(mediaElement);

    textElement.innerText = textNode.text
    while (optionBtns.firstChild) {
        optionBtns.removeChild(optionBtns.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionBtns.appendChild(button)
        }
    })
}

function createMediaElement(media) {
    switch (media.type) {
      case 'image':
        const imageElement = document.createElement('img');
        imageElement.src = media.source;
        return imageElement;
      case 'video':
        const videoElement = document.createElement('video');
        videoElement.src = media.source;
        videoElement.controls = false;
        videoElement.loop = true;
        videoElement.autoplay = true;

        return videoElement;
      case 'gif':
      const gifElement = document.createElement('img');
      gifElement.src = media.source;
      // You can add any additional styling or classes for GIFs
      return gifElement;
    case 'audio':
      const audioElement = document.createElement('audio');
      audioElement.src = media.source;
      audioElement.controls = true;
      // Add the autoplay attribute to enable autoplay for audio if needed
      // audioElement.autoplay = true;
      return audioElement;
      default:
        return null; // Unsupported media type
    }
  }
  

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 0,
        text: "Always forward never back... \nWhat you skip, is what you lack. \nIts your choice, which way to go.  \nSo many guesses, one way to know. \nTake what you've learned, know what is fact. \nAlways forward never back.",
        media: {
            type: 'gif',
            source: 'https://vfergdev.github.io/afnb/images/afnb.gif',
        },
        options: [
            {
                text: 'Start your journey',
                nextText: 1
            },
        ]
    },
    {
        id: 1,
        text: 'You wake up in a strange place. A dense mist blankets the mysterious Everwood forest. You know it is Everwood, like "... memories of whispers" The ancient trees loom overhead, their branches entwined in a dance that seems to defy time. As you step into the fog, you feel a subtle push forward, and the adventure unfolds.',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/dense-mist.png',
        },
        options: [
            {
                text: 'Follow the flickering lights deeper into the forest.',
                nextText: 2
            },
            {
                text: 'Run the other way, towards the subtle blue glow.',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'The fireflies lead you to a hidden glade, where a shimmering pool reflects the moonlight. A figure makes noise coming out of the brush... \nthey ask "Answer a riddle or hear a quote... Trust there are always consequences to both',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/fireflies.png',
        },
        options: [
            {
                text: 'A riddle',
                setState: { riddle: true },
                nextText: 4
            },
            {
                text: 'Or a quote',
                setState: {quote: true },
                nextText: 6
            },
        ]
    },
    {
        id: 3,
        text: 'The closer you get the brighter the blue. You pick it up and its a jar of blue glowing goo',
        media: {
            type: 'gif',
            source: 'https://vfergdev.github.io/afnb/images/goo-tree.gif',
        },
        options: [
            {
                text: 'Take goo',
                setState: { blueGoo: true },
                nextText: 5
            },
            {
                text: 'Leave goo',
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: 'Surrounded we are, messages in the glowing celestial hues, dances in the night, small as an ant, whispers secrets to the moon',
        media: {
            type: 'gif',
            source: 'https://vfergdev.github.io/afnb/images/lake.gif',
        },
        options: [
            {
                text: 'Fireflies at night',
                setState: { blueGoo: true },
                nextText: 8
            },
            {
                text: 'Crystal Ball on the solstice',
                nextText: 10
            }
        ]
    },
    {
        id: 5,
        text: 'You venture forth in search of answers. You arrive at a road with a merchant along the side.',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/merchant-trade.png',
        },
        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 7
            },
            {
                text: 'Trade the goo for a pearl',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, pearl: true },
                nextText: 7
            },
            {
                text: 'Pass the merchant',
                nextText: 7
            },
        ]
    },
    
    {
        id: 6,
        text: '"Your children are not as attractive as your paintings Mallius"\nto which Mallius replied \n"That is true because I make pictures in the daylight and my children in the dark. \n That was fun. And your reward is simple... The answers you seek can be found at the Rish temple. And this amulet for truth',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/baby.png',
        },
        options: [
            {
                text: 'Your journey now turns to find the Rish temple ',
                setState: { rish: true },
                nextText: 7
            },
        ]
    },
    {
        id: 7,
        text: 'After leaving you start to fall tired and stumble upon a small town overlooked by a dark castle.',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/town.png',
        },
        options: [
            {
                text: 'Explore the castle',
                nextText: 9
            },
            {
                text: 'Find an inn with a room in town',
                nextText: 11
            },
            {
                text: 'Find some way hay in a stable to sleep in',
                nextText: 13
            },
        ]
    },
    {
        id: 8,
        text: 'That is it, you got it right! Now they will always be along your path to guide with lights. They light your way to a bustling town. overlooked by a castle',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/town.png',
        },
        options: [
            {
                text: 'Explore the castle',
                setState: { light: true },
                nextText: 9
            },
            {
                text: 'Find an inn with a room in town',
                setState: { light: true },
                nextText: 11
            },
            {
                text: 'Find some way hay in a stable to sleep in',
                setState: { light: true },
                nextText: 13
            },
        ]
    },
    {
        id: 9,
        text: 'You are so tired that you fall asleep while exploring the castle \n A terrifying MONSTER appeared!',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/monster.png',
        },
        options: [
            {
                text: 'Though you fought hard and valiant. This is where your story ends',
                nextText: -1
            },
            {
                text: 'The light of your fireflies delights him away. As you find a map and a corridor to escape.',
                requiredState: (currentState) => currentState.light,
                setState: { light: false, map: true },
                nextText: 30
            },
            {
                text: 'The monster reaches for you but is thrown back by the protection of your amulet',
                requiredState: (currentState) => currentState.rish,
                nextText: 30
            }
        ]
    },
    {
        id: 10,
        text: 'How unfortunate of a tale and song... You guessed wrong.your journey takes a turn to my dungeon in Alderrong',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/dungeon.png',
        },
        options: [
            {
                text: 'With a word and a snap a portal appears. Instantly fear',
                nextText: 14
            }
        ]
    },
    {
        id: 11,
        text: 'Without any money to rent a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and calls the the town guards lock you in a cell...',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/inn.png',
        },
        options: [
            {
                text: 'Trade your pearl for your freedom',
                requiredState: (currentState) => currentState.pearl,
                nextText: 30
            },
            {
                text: 'You show them the amulet and they take you to the town Riff, by all accounts the town leader.',
                requiredState: (currentState) => currentState.rish,
                nextText: 16
            },
            {
                text: 'Fight your way out',
                requiredState: (currentState) => currentState.sword,
                nextText: 17
            },
            {
                text: 'Go to jail. At least you have a place to sleep.',
                nextText: 14
            },
            
        ]
    },
    {
        id: 13,
        text: 'You found a stable with some hay to sleep on. You were found by the owners; they offered you hot soup and a warm fire.',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/stable.png',
        },
        options: [
            {
                text: 'Thank them for the food and ask them questions you have been dying to ask someone',
                nextText: 15
            }
        ]
    },
    {
        id: 14,
        text: 'Welcome to the Alderrong Dugeon Nudk is the name',
        media: {
            type: 'gif',
            source: 'https://vfergdev.github.io/afnb/images/prisoner.gif',
        },
        options: [
            {
                text: 'next',
                nextText: 30
            }
        ]
    },
    {
        id: 15,
        text: 'They tell you all you need to know, like who to see and where to go. "Beware of Mibdens, and take this food to go" \nThey know its always your choice \n no matter what you have heard. They only requirement is never backwards, always forward.',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/fireplace.png',
        },
        options: [
            {
                text: 'Head to the castle',
                nextText: 16
            },
            {
                text: 'Head to the temple with your food',
                requiredState: (currentState) => currentState.rish,
                nextText: 30
            },
            {
                text: 'Go to the market and sell your pearl',
                requiredState: (currentState) => currentState.pearl,
                setState: { pearl: false, coin: true },
                nextText: 30
            },
        ]
    },
    {
        id: 16,
        text: 'The castle is even more grand up close. As you go inside you are greeted by your host',
        media: {
            type: 'gif',
            source: 'https://vfergdev.github.io/afnb/images/castle.gif',
        },
        options: [
            {
                text: 'Follow to the throne room',
                nextText: 30
            }
        ]
    },
    {
        id: 17,
        text: 'You fought your way out into an alley. Sword in hand. You have but two choice face it or ran/.',
        media: {
            type: 'image',
            source: 'https://vfergdev.github.io/afnb/images/sword-in-hand.png',
        },
        options: [
            {
                text: 'Turn yourself in. Plead your case to the Riff',
                nextText: 16
            },
            {
                text: 'Keep a low profile, find a way off the streets',
                // requiredState: (currentState) => currentState.sword,
                nextText: 30
            }
        ]
    },
    {
        id: 30,
        text: 'To Be Continued...',
        media: {
            type: 'gif',
            source: 'https://vfergdev.github.io/afnb/images/tbc.gif',
        },
        options: [
            {
                text: 'You know where you are going... not sure what to do!',
                requiredState: (currentState) => currentState.rish,
                nextText: -1
            },
            {
                text: 'You have your map you are on your way',
                requiredState: (currentState) => currentState.map,
                nextText: -1
            },
            {
                text: 'By light of the fireflies, you are on your way',
                requiredState: (currentState) => currentState.light,
                nextText: -1
            },
            {
                text: 'Coin in hand where to next',
                requiredState: (currentState) => currentState.coin,
                nextText: -1
            },
            {
                text: 'To The Beginning',
                nextText: -1
            },
            {
                text: 'You are still lost',
                requiredState: (currentState) => currentState.sword,
                nextText: -1
            }
        ]
    },
]

startGame();