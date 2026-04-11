/**
 * Static show data for Disneyland Resort Hotels.
 * Showtimes are generated daily from the `dailyTimes` field (Pacific time strings).
 * Update `dailyTimes` when the schedule changes seasonally.
 */

const showContentHotels = [

  // ── Shows ────────────────────────────────────────────────────────────────────

  {
    id: 'hotel-enchanted-serenaders',
    name: 'The Enchanted Serenaders',
    description: "Double check this.",
    imageUrl: "show-images/trader-sams.webp",
    location: 'Disneyland Hotel',
    preciseLocation: "Trader Sam's Enchanted Tiki Bar",
    duration: null,
    categories: ['Shows'],
    dailyTimes: ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
  },

  {
    id: 'hotel-great-hall-pianist',
    name: 'Great Hall Pianist',
    description: null,
    imageUrl: "show-images/great-hall-pianist.jpg",
    location: 'Grand Californian Hotel',
    preciseLocation: 'Great Hall',
    duration: null,
    categories: ['Shows'],
    dailyTimes: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:30 PM', '7:30 PM', '8:30 PM'],
  },

  // ── Events ───────────────────────────────────────────────────────────────────

  {
    id: 'hotel-disneyland-hotel-tour',
    name: 'Disneyland Hotel Tour',
    description: null,
    imageUrl: "show-images/disneyland-hotel.jpg",
    location: 'Disneyland Hotel',
    preciseLocation: null,
    duration: null,
    categories: ['Events'],
    dailyTimes: ['1:00 PM'],
  },

  {
    id: 'hotel-washcloth-creations',
    name: 'Washcloth Creations',
    description: "You can learn from Cast Members how to make creations from washcloths and you’ll get to take one home with you.",
    imageUrl: "show-images/disneyland-hotel.jpg",
    location: 'Disneyland Hotel',
    preciseLocation: null,
    duration: null,
    categories: ['Events'],
    dailyTimes: ['9:30 AM'],
  },

  {
    id: 'hotel-art-of-the-craft-tour',
    name: 'Art of the Craft Tour',
    description: 'ONLY ON: T, W, TH\n\nArt of the Craft Tour focuses on both the history of the Arts and Crafts movement and the history and details of the hotel. This tour is for anyone who is interested in Disneyland history, architecture, or the Arts and Crafts movement. "I had no idea so much of the hotel was hand-crafted."',
    imageUrl: "show-images/art-of-craft.webp",
    location: 'Grand Californian Hotel',
    preciseLocation: null,
    duration: 60,
    categories: ['Events'],
    dailyTimes: ['2:00 PM'],
  },

  {
    id: 'hotel-learn-to-draw',
    name: 'Learn to Draw',
    description: "It's a drawing class listed on the Disney hotel events, but not a lot of info on it.",
    imageUrl: "show-images/pixar-place.webp",
    location: 'Pixar Hotel??',
    preciseLocation: null,
    duration: null,
    categories: ['Events'],
    dailyTimes: ['1:30 PM', '2:30 PM'],
  },

]

export default showContentHotels
