/**
 * Manual content layer for show enrichment — Downtown Disney District.
 * Keyed by the ThemeParkIQ show slug (from the URL path).
 *
 * Fields:
 *   description     {string}  - Show description shown on the detail page.
 *   imageUrl        {string}  - Path to image in /public/show-images/
 *   location        {string}  - Area within Downtown Disney
 *   preciseLocation {string}  - Specific spot
 *   duration        {number}  - Show duration in minutes
 *
 * All fields are optional — omit any you don't have yet.
 */

const showContentDD = {

  'downtown-disney-live-stage': {
    // Downtown Disney LIVE! Stage Entertainment
    description: "Gather with friends and family on the lawn to enjoy live music in the most beautiful setting—surrounded by trees of the Downtown Disney District! Dance and sing along to a variety of music—including Motown, rock, jazz and reggae. In addition, Guests can celebrate seasonal acts and specialty performances throughout the year.\n\nEntertainment offerings are subject to availability, capacity, change or cancellation without notice. View our daily entertainment schedule to explore upcoming performances.",
    imageUrl: "show-images/dd-live.webp",
    location: 'Downtown Disney District',
    preciseLocation: null,
    duration: 40,
  },

  'splitsville-kingpin-stage': {
    // The Alley
    description: "Step out onto Splitsville’s patio and enjoy the chill atmosphere set by phenomenal local musicians. Diners can feast on fresh-rolled sushi, hand-tossed pizzas, expertly crafted cocktails and more!",
    imageUrl: "show-images/the-alley.webp",
    location: 'Downtown Disney District',
    preciseLocation: "By Splitsville Luxury Lanes",
    duration: 40,
  },

  'jazz-kitchen-music': {
    // Jazz Kitchen Music
    description: "Dine at Jazz Kitchen Coastal Grill & Patio to enjoy a modern twist on Creole and Cajun cuisine for dinner and listen to jazz music, featuring live singers and musicians playing multiple genres of jazz.",
    imageUrl: "show-images/jazz-kitchen.webp",
    location: 'Downtown Disney District',
    preciseLocation: "Over by the Splitsville bowling alley",
    duration: 40,
  },

}

export default showContentDD
