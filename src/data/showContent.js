/**
 * Manual content layer for show enrichment.
 * Keyed by themeparks.wiki entity ID.
 *
 * Fields:
 *   description     {string}  - Show description shown on the detail page.
 *   imageUrl        {string}  - Path to image in /public/show-images/ (e.g. "/show-images/dapper-dans.jpg")
 *   location        {string}  - Land name (e.g. "Main Street, U.S.A.")
 *   preciseLocation {string}  - Specific spot within the land (e.g. "In front of the train station")
 *   duration        {number}  - Show duration in minutes
 *   poi             {boolean} - Set to true to hide from show listings (points of interest, ambient areas, etc.)
 *
 * All fields are optional — omit any you don't have yet.
 */

const showContent = {

  // ── Disneyland Park ──────────────────────────────────────────────────────────

  'fdf0e3b1-2eeb-42b4-9516-5d43463d021e': {
    // The Dapper Dans
    duration: 20,
    description: 'This barbershop quartet spins harmonies as they play the chimes, tap dance and regale audiences with vaudeville wit.',
    imageUrl: '/show-images/dapper-dans-00.webp',
    location: 'Main Street, U.S.A.',
    preciseLocation: 'In front of the train station',
  },

  '95a9cde3-ff1f-40a3-8276-2477ded688f8': {
    // Bluey's Best Day Ever!
    duration: null,
    description: 'Join Bluey and her sister Bingo for a fun-filled celebration of Bluey episodes with interactive games and live musical show!',
    imageUrl: '/show-images/bluey.webp',
    location: 'Fantasyland',
    preciseLocation: 'Near Red Rose Taverne',
  },

  '78568c55-6dcb-4893-a14e-ba7ed9bddaff': {
    // Disneyland Band at "it's a small world" Promenade
    description: "The Disneyland Band has been performing at Disneyland since 1955 -- and it still draws quite a crowd. The Band performs several times daily.",
    imageUrl: "show-images/disneyland-band.jpg",
    location: 'Fantasyland',
    preciseLocation: "It's a Small World",
    duration: 18,
  },

  '228b9736-f889-469f-92f7-0e89bf150d5c': {
    // Disneyland Band at Castle Promenade
    description: "The Disneyland Band has been performing at Disneyland since 1955 -- and it still draws quite a crowd. The Band performs several times daily.",
    imageUrl: "show-images/disneyland-band.jpg",
    location: 'Fantasyland',
    preciseLocation: "Past the Hub, towards the Castle",
    duration: 18,
  },

  'cb84b53c-dbb5-483d-a717-00d9259c6484': {
    // Disneyland Band at Frontierland
    description: "The Disneyland Band has been performing at Disneyland since 1955 -- and it still draws quite a crowd. The Band performs several times daily.",
    imageUrl: "show-images/disneyland-band.jpg",
    location: 'Main Street, U.S.A.',
    preciseLocation: "In front of the Golden Horseshoe",
    duration: 18,
  },

  'a6760f7b-3489-47df-9547-d70dd2d8cb76': {
    // Disneyland Band at Main Street, U.S.A.
    description: "The Disneyland Band has been performing at Disneyland since 1955 -- and it still draws quite a crowd. The Band performs several times daily.",
    imageUrl: "show-images/disneyland-band.jpg",
    location: 'Main Street, U.S.A.',
    preciseLocation: "By the Train Station",
    duration: 18,
  },

  '8c36ff0b-3a32-4d7b-9388-0516c19277db': {
    // Fantasmic!
    description: "Daring heroes and epic villains do battle on a grand scale in an incredible nighttime show—starring Mickey Mouse.",
    imageUrl: "show-images/fantasmic.jpg",
    location: 'New Orleans Square',
    preciseLocation: 'Across from Pirates',
    duration: 25,
  },

  'e9ef1443-c735-43b6-81c6-45e53527cf93': {
    // Fire of the Rising Moons
    description: "During Fire of the Rising Moons, villagers and visitors alike come together to celebrate their freedom and to honor the heroes and legends who came before them. As the skies over Batuu light up in bursts of color, iconic music associated with tales from across the galaxy ignites our imagination. It’s a powerful moment you won’t want to miss!",
    imageUrl: 'show-images/galaxyEdge.webp',
    location: "Star Wars Galaxy's Edge",
    preciseLocation: "Millennium  Falcon",
    duration: 13,
  },

  'eeafc865-a4e0-4dc5-9cea-446108bf7d48': {
    // Flag Retreat Ceremony
    description: "Every day in the afternoon, the Disneyland Band and/or Dapper Dans vocal group marches to the front of Main Street to perform a number of Americana tunes. Park security guards then lower the American flag as the band plays 'The Star-Spangled Banner' in a very respectful ceremony. Though this 20-minute event, including the band's march down Main Street, has been happening for years, it has enjoyed a larger audience in recent years because of its patriotic feel.",
    imageUrl: 'show-images/flag-ceremony.jpg',
    location: 'Main Street, U.S.A.',
    preciseLocation: 'Main Street flag pole',
    duration: 20,
  },

  '3220fd76-38e4-49a4-afa3-4842c07203fa': {
    // Jambalaya Jazz
    description: "New Orleans-style jazz band that performs on the French Market stage and elsewhere in New Orleans Square, including on the Mark Twain Riverboat.",
    imageUrl: "show-images/jambalaya-jazz.jpg",
    location: 'Frontierland - New Orleans Square',
    preciseLocation: "French Market Stage?",
    duration: 15,
  },

  '640525ab-75db-4f3c-b917-27ecb7b5ef97': {
    // Jambalaya Jazz Band on the Mark Twain Riverboat
    description: "New Orleans-style jazz band that performs on the French Market stage and elsewhere in New Orleans Square, including on the Mark Twain Riverboat.",
    imageUrl: "show-images/jambalaya-jazz.jpg",
    location: 'Frontierland - New Orleans Square',
    preciseLocation: "Mark Twain Riverboat",
    duration: 15,
  },

  '8b12916b-a384-4305-838a-c4b07affbb14': {
    // Main Street Piano Player
    description: "As you walk down Main Street U.S.A., a fanciful surprise awaits—a live outdoor piano performance. \n\nFeaturing swell ragtime tunes from a bygone era, these syncopated stylings will have you tapping your toes. When folks start to gather around, don’t be surprised if they start to croon along. Between ditties, this proficient pianist may entertain you with one-liners and zingers.",
    imageUrl: 'show-images/main-street-pianist.webp',
    location: 'Main Street, U.S.A.',
    preciseLocation: "In front of Casey's Corner",
    duration: 20,
  },

  '33cbbd09-6d93-40d7-b758-9d7b7d3fd2eb': {
    // Meet Disney Princesses at Royal Hall
    description: "Royal Hall in Fantasy Faire is home to Disney Princesses from some of your favorite fairytales. Each Princess receives Guests in her own special nook amidst magnificent surroundings and resplendent décor.\n\nYou can pose for photos, collect autographs and 'hold court' with up to 3 of the world’s best-loved Disney Princesses at any given time.",
    imageUrl: "show-images/meet-disney-princesses.webp",
    location: 'Fantasyland',
    preciseLocation: "Royal Hall - towards the Castle",
    duration: null,
  },

  '5a107a57-9174-4f3f-9be7-625a5d5bb899': {
    // Mickey's House and Meet Mickey Mouse
    description: "Take a tour of Mickey Mouse’s humble abode and then meet, greet and snap a photo with the Big Cheese himself.",
    imageUrl: "show-images/Mickeys-House.webp",
    location: 'Toontown',
    preciseLocation: null,
    duration: 5,
  },

  'c60e9de0-df2b-4484-9b05-299939dc247a': {
    // Paint the Night
    description: "Behold the return of this dazzling nighttime parade throughout Disneyland Park—in honor of the Disneyland Resort 70th Celebration!",
    imageUrl: "show-images/paintthenight.webp",
    location: 'Main Street, U.S.A.',
    preciseLocation: null,
    duration: null,
    categories: ['Nighttime', 'Parades'],
  },

  '9212c98b-3638-4f0b-bf42-2e2848330e1d': {
    // Pearly Band at Castle Courtyard
    description: "Live entertainment that performs in various Fantasyland locations in the afternoon. Look for bright-colored uniforms with pearl-like buttons and instruments like drums, trumpets, and saxophones. Pearly Band is sometimes joined by Mary and Bert from Mary Poppins",
    imageUrl: "show-images/pearly-band.jpg",
    location: 'Fantasyland',
    preciseLocation: null,
    duration: 15,
  },

  '4119dd28-6da8-46a0-9246-bea86e07ac61': {
    // Pearly Band near "it's a small world"
    description: "Live entertainment that performs in various Fantasyland locations in the afternoon. Look for bright-colored uniforms with pearl-like buttons and instruments like drums, trumpets, and saxophones. Pearly Band is sometimes joined by Mary and Bert from Mary Poppins",
    imageUrl: "show-images/pearly-band.jpg",
    location: 'Fantasyland',
    preciseLocation: "It's a Small World",
    duration: 15,
  },

  'fa0ef252-8002-4c39-934b-46c3231d206e': {
    // Shadows of Memory: A Skywalker Saga
    description: "Gather near the Millennium Falcon to embark on a storytelling adventure across the galaxy. Stunning projection effects transform the spires of Batuu, evoking memories of some of the greatest moments in galactic history, as an iconic musical score draws you into the remarkable story of the Skywalkers.",
    imageUrl: 'show-images/shadows.avif',
    location: "Galaxy's Eduge",
    preciseLocation: "Millennium Falcon",
    duration: null,
  },

  '72340a8a-b6d2-474f-aca5-5ea7d2d52335': {
    // Storytelling at Royal Theatre
    description: 'Make your way inside an open-air medieval-style tent and gather in front of the charming stage. Dynamic thespian duo Mr. Smythe and Mr. Jones are your hosts as they direct their witty version of scenes from Beauty and the Beast or Tangled.\n\nPrepare to be transported to the funny, fantastical world of “happily ever after.”',
    imageUrl: "show-images/storytelling-royal-theatre.webp",
    location: 'Fantasyland',
    preciseLocation: 'The Royal Theatre',
    duration: 25,
  },

  '34f7bd8a-ec8e-41ac-9d63-d94ffc54f1ef': {
    // Tapestry of Happiness
    description: 'Witness the iconic façade of “it’s a small world” transform into a vibrant, animated mosaic inspired by the work of legendary Disney artist Mary Blair. This visual love letter to 70 years of unforgettable Disneyland experiences celebrates beloved attractions, cherished moments and the timeless spirit of the Happiest Place on Earth.',
    imageUrl: 'show-images/tapestry.webp',
    location: 'Fantasyland',
    preciseLocation: "It's a Small World",
    duration: null,
  },

  '8160b905-b318-41be-84bf-869fb6a55b14': {
    // The Bootstrappers
    description: "This rotating cast of singing pirates, they sing old sea shanties as well as Yo Ho, Yo Ho, A Pirates Life for Me. They generally somewhere close to Cafe Orleans, engaging guests with their unique sense of humor and entertainment.",
    imageUrl: "show-images/new-orleans.jpg",
    location: 'Frontierland',
    preciseLocation: "New Orleans Square",
    duration: 20,
  },

  'ff9c3639-2edd-4ece-8515-54e71ccf1067': {
    // The Celebrate Happy Cavalcade
    description: "Celebrate 70 years of Disneyland Park magic during an energetic cavalcade led by Mickey Mouse and some of his friends, including Duffy, ShellieMay, Max, Disney Princesses and Heroes and more! Don’t miss your chance to Celebrate Happy when the party hits the street!",
    imageUrl: '/show-images/celebrate_happy.jpg',
    location: 'Main Street, U.S.A.',
    preciseLocation: null,
    duration: null,
  },

  '115863ac-0880-4630-afd3-b1a1b5033d51': {
    // Wondrous Journeys with Fireworks
    description: "During the Disneyland Resort 70th Celebration, thrill to this stunning nighttime spectacular celebrating the legacy of Walt Disney Animation Studios.",
    imageUrl: "show-images/wondrous-journey.webp",
    location: "Main Street U.S.A.",
    preciseLocation: "All up and down it with focus on the Castle",
    duration: 13,
  },

  '2e062fa5-42fd-4167-859c-aa00fddfa22c': {
    // Wondrous Journeys with Projections
    description: "During the Disneyland Resort 70th Celebration, thrill to this stunning nighttime spectacular celebrating the legacy of Walt Disney Animation Studios.",
    imageUrl: "show-images/wondrous-journey.webp",
    location: "Main Street U.S.A.",
    preciseLocation: "All up and down it with focus on the Castle",
    duration: 13,
  },

}

export default showContent
