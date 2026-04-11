/**
 * Manual content layer for show enrichment — Disney California Adventure.
 * Keyed by themeparks.wiki entity ID.
 *
 * Fields:
 *   description     {string}  - Show description shown on the detail page.
 *   imageUrl        {string}  - Path to image in /public/show-images/ (e.g. "/show-images/foo.jpg")
 *   location        {string}  - Land name (e.g. "Buena Vista Street")
 *   preciseLocation {string}  - Specific spot within the land
 *   duration        {number}  - Show duration in minutes
 *   poi             {boolean} - Set to true to hide from show listings (points of interest, ambient areas, etc.)
 *
 * All fields are optional — omit any you don't have yet.
 */

const showContentDCA = {

  '531f6200-393e-4e4d-b95e-aedd30102e49': {
    // Ancient Sanctum — ambient character area, not a scheduled show
    poi: true,
    description: "For as long as anyone can remember, rumors of unexplained events and energies have emanated from a remote location in the hills outside Los Angeles.\n\nIn the late 1940s, a Stark Industries complex was built on the location. Decades later, Tony Stark invited Doctor Strange to the Avengers Campus to enlighten recruits about the mystic arts. Doctor Strange suspended the area’s cloaking spells and revealed the Ancient Sanctum to the world.\n\nThe Orb of Cagliostro is known to be especially active at night. Visit after dark and you might see the Ancient Sanctum flowing with magical energy!",
    imageUrl: "show-images/the-sanctum.webp",
    location: "Avenger’s Campus",
    preciseLocation: 'Across from Web Slingers',
    duration: null,
  },

  '3ee735b5-68dc-470a-a4a2-6ddd415b9cbd': {
    // Avengers Headquarters — ambient hero encounter area, not a scheduled show
    poi: true,
    description: "Encounter some of Earth’s Mightiest Heroes and watch them spring into action to defend the Avengers command center!",
    imageUrl: "show-images/avengers-campus.webp",
    location: 'Avengers Campus',
    preciseLocation: null,
    duration: null,
  },

  '8d4b6d5f-558f-4210-82b5-02b0570232ea': {
    // Citizens of Buena Vista Street
    poi: true,
    description: "The land depicts a typical Los Angeles neighborhood where a young Walt Disney lived and worked after arriving in Southern California in 1923. This idyllic version of the City of Angels is captured with quaint shops, a big city department store and corner café. The architecture is inspired by actual buildings in greater Los Angeles. During the Disneyland Resort 70th Celebration, themed decor will adorn Buena Vista Street and everyone around Carthay Circle is invited to enjoy a special evening moment filled with music, lights, and projection effects.",
    imageUrl: "show-images/buena-vista-citizens.jpg",
    location: 'Buena Vista Street',
    preciseLocation: null,
    duration: null,
  },

  '2fdd02e8-3835-4ef8-bd07-4c3332fb84fa': {
    // Confection Purrfection with the SuperKitties
    description: "Chefs ages 3 to 11 are invited to express their creativity through hands-on cupcake decorating with a special visit from the SuperKitties, who arrive to show how food can save the day by bringing everyone together!",
    imageUrl: "show-images/confection.webp",
    location: "Hollywood Land",
    preciseLocation: "Hollywood Backlot Stage",
    duration: 30,
  },

  '4b7f57a0-c841-43d1-8abb-d13a3b7f2597': {
    // Cookin' with the Jammin' Chefs
    description: "Watch the Jammin’ Chefs combine pots, pans and different beats to demonstrate irresistible kitchen “sink-o-pation!” Fun is on the menu when Clarabelle Cow, Daisy Duck, Pluto and Chip ‘n Dale show up for all the excitement.",
    imageUrl: "show-images/jammin-chefs.webp",
    location: "Paradise Gardens Park",
    preciseLocation: "Where World of Color is by the water.",
    duration: 15,
  },

  '464ba110-9573-457b-abad-54a740e0ec33': {
    // Culinary Demonstrations at the Disney California Adventure Food & Wine Festival
    description: "Don't miss tasty tips and tricks from celebrated Disney and visiting chefs during the festival's demonstration series—March 6 through April 27, 2026",
    imageUrl: "show-images/culinary-demo.webp",
    location: "Hollywood Land",
    preciseLocation: "Backlot Stage",
    duration: 60,
  },

  '8c0a4fdb-69e0-4e4e-ab80-d8247edabe3a': {
    // Disney Jr. Mickey Mouse Clubhouse Live!
    description: "Step into the rhythm at this fun-filled show packed with upbeat, toe-tapping tunes! Watch the adventure unfold when Mickey Mouse and Minnie Mouse embark on a road trip to round up their best pals—Goofy, Daisy and Pluto who haven’t made it to the party yet. ",
    imageUrl: "show-images/MMCL.webp",
    location: "Hollywood Land",
    preciseLocation: "Disney Theater",
    duration: null,
  },

  '12180467-471a-4f93-a7b1-7115aab487f2': {
    // Disney® Visa® Cardmember Heroic Encounter
    description: "Stop by our private location just for Cardmembers—near Stage 17 in Hollywood Land at Disney California Adventure Park, to have your picture taken.\n\nPose for special photos with some legendary Super Heroes!",
    imageUrl: "show-images/heroic-inc.avif",
    location: 'Avengers Campus',
    preciseLocation: "Near Stage 17 and Monsters Inc.",
    duration: null,
  },

  '449e351b-a05a-4a52-8893-0ed5c1f6fc48': {
    // Five & Dime
    description: "Get hip to the jive—this band’s the bee’s knees and the cat’s meow. These 5 guys from Chicago just arrived in town in a souped-up jalopy. With a lovely female vocalist named Dime on the mic, they’re destined for stardom.",
    imageUrl: "show-images/fivendime.avif",
    location: 'Buena Vista Street',
    preciseLocation: "By Carthay Circle",
    duration: 20,
  },

  '0c6c7664-94f0-48b0-91ce-7cc2108a72c9': {
    // Guardians of the Galaxy: Awesome Dance Off!
    description: "The Guardians of the Galaxy are ready to party—with you! Gather around as Peter tries to get Gamora to crack a smile by playing his legendary mixtape. Help him out by showing off your own epic dance moves!",
    imageUrl: "show-images/guardians-galaxy-dance-off.avif",
    location: 'Avengers Campus',
    preciseLocation: "By Tower of Terror...I mean Mission Breakout",
    duration: 10,
  },

  'a4374b75-7fa4-4205-9571-02099e08944f': {
    // Meet Chef Goofy
    description: "Head to the Hollywood Backlot for a deliciously wacky encounter with Goofy the chef. He’s all dressed up and ready to flambé his way into your heart—so come on by!",
    imageUrl: "show-images/chef-goofy.avif",
    location: "Hollywood Land",
    preciseLocation: "Studio Catering Truck by Hollywood Lounge",
    duration: null,
  },

  '4c570f5a-c5da-4388-9804-dd56123d18ce': {
    // Meet Disney Pals on Buena Vista Street
    description: "Be ready as you stroll Buena Vista Street, because you may run into some big stars. Mickey Mouse, Minnie Mouse and Goofy love spending time here—and making new friends. They’re dressed to the nines and ready for their close-up!",
    imageUrl: "show-images/dca-mikey-buena-vista.avif",
    location: 'Buena Vista Street',
    preciseLocation: "Carthay Circle",
    duration: null,
  },

  'f71bfc6e-2f10-40a1-bf29-a4b98c5350f4': {
    // Meet the Residents of Radiator Springs in Cars Land
    description: "Encounter some familiar grills as these race track regulars put it in park to greet their biggest fans.\n\nYou can usually find either Lightning McQueen or Mater at the Cozy Cone Motel. Straight from the track and ready for some well-earned R&R, these best friends are glad to be hanging out in Radiator Springs—and excited to meet you!",
    imageUrl: "show-images/mater.webp",
    location: 'Cars Land',
    preciseLocation: "Near Cozy Cone Motel",
    duration: null,
  },

  'af195dcb-a69e-499a-b659-6751ee871f79': {
    // Operation: Playtime! - featuring the Green Army Patrol
    description: "The Green Army Men from Disney-Pixar's Toy Story cruise Paradise Gardens Park in a jeep on a quest to find new recruits. The Army Men stop periodically to train guests (the potential recruits) on critical skills like 'fun' and 'play' by exhibiting their percussion and chanting skills.",
    imageUrl: "show-images/pixar-prom.jpg",
    location: 'Pixar Pier',
    preciseLocation: "Paradise Gardens Park",
    duration: 9,
  },

  '19dad87e-2df8-4fe2-9562-c711d464e4b7': {
    // Palisades Stage
    description: "During March and April 2026, catch high-energy live performances where talented artists bring the party to life with jazz, rock ‘n’ roll, R&B and more!",
    imageUrl: "show-images/palisades-stage.webp",
    location: 'Pixar Pier',
    preciseLocation: "Paradise Gardens Park",
    duration: null,
  },

  'dca741a6-3472-4d4f-a9aa-7774aae81754': {
    // Paradise Garden Bandstand
    description: "During March and April 2026, catch high-energy live performances where talented artists bring the party to life with jazz, rock ‘n’ roll, R&B and more!",
    imageUrl: "show-images/paradise-garden-bandstand.webp",
    location: 'Paradise Gardens Park',
    preciseLocation: "the Farside over by Goofy's Sky School",
    duration: null,
  },

  'bdb0a3ec-eb7a-41c9-918f-ccee7194743e': {
    // The Amazing Spider-Man!
    description: "A short stunt show featuring Spider-man. Located on top of W.E.B. (the building that houses the WEB SLINGERS attraction). The show culminates in Spider-Man taking a spectacular flight high through the air above Avengers Campus.",
    imageUrl: "show-images/amazing-sm.jpg",
    location: 'Avengers Campus',
    preciseLocation: null,
    duration: 5,
  },

  '1b6a816a-337c-431c-8df6-72f993e15e64': {
    // Warriors of Wakanda: The Disciplines of the Dora Milaje
    description: "General Okoye teaches the ways of the Dora Milaje from Marvel's Blank Panther series. This show has segments that feature audience participation.",
    imageUrl: "show-images/wakanda.jpg",
    location: 'Avengers Campus',
    preciseLocation: "by PYM Test Kitchen",
    duration: null,
  },

  '457e2029-852f-4de7-9ca0-e4cc6f0cfcad': {
    // World of Color Happiness!
    description: "Visit Disney California Adventure Park for a new nighttime spectacular, inspired by Walt Disney’s words from the opening-day dedication of Disneyland 7 decades ago: “To all who come to this happy place… welcome!”",
    imageUrl: "show-images/world-of-color-happiness.webp",
    location: 'Paradise Gardens Park',
    preciseLocation: null,
    duration: null,
  },

}

export default showContentDCA
