// Seed content ported from the live RosaryNest WordPress site (techyminds.in/rsn),
// scraped via its REST API and rendered HTML. Used to populate local D1 for
// development, and as the canonical starting point for admin-editable content.

export const settingsSeed: Record<string, string> = {
  logo_url: "/images/RosaryNest-animated1.svg",
  hero_media_type: "video",
  hero_image_url: "",
  hero_video_url: "",
  site_name: "RosaryNest",
  tagline: "where stillness stays",
  established_year: "2010",
  phone: "+91 98477 76136",
  whatsapp: "+91 98477 76136",
  email: "stay@rosarynest.com",
  address_line1: "223J+GW5, Sengulam-Muthuvankudi Road, Near Little Flower Mercy Home",
  address_line2: "Anachal, Bison Valley, Munnar, Kerala 685565, India",
  latitude: "10.0889",
  longitude: "77.0595",
  instagram_url: "",
  facebook_url: "",
  tripadvisor_url: "",
  hours_note: "We answer between 8 in the morning and 9 in the evening, IST. Late notes get a reply with the first pot of tea.",
};

export type CottageSeed = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  capacitySummary: string;
  areaSqm: number | null;
  amenities: string[];
  images: string[];
  displayOrder: number;
};

// TODO: capacitySummary and images below use soft, true-by-default
// descriptions only. Add verified capacity, bed configuration, and size
// for each cottage before launch.
export const cottagesSeed: CottageSeed[] = [
  {
    slug: "den-view-cottage",
    name: "Den View Cottage",
    tagline: "Mornings begin in the garden.",
    description:
      "Named for the wooded den just below its windows, this is the cottage where mornings start early — you'll hear the garden before you see it. One room, quietly furnished, with a private veranda that catches the first light over the property. There's barbecue space right outside, if you'd rather cook than walk down to the main house.",
    capacitySummary: "1 room, 6 guests maximum",
    areaSqm: null,
    amenities: [
      "Barbecue",
      "Trash cans",
      "Clothes rack",
      "Wardrobe/Closet",
      "Fan",
      "Tile/Marble floor",
      "Private bathroom",
      "Toilet paper",
      "Toiletries",
      "Bathrobe",
      "Shower",
      "Bottle of Water",
      "Electric kettle",
      "Towels",
      "TV",
      "Linens",
      "Bed linen",
      "Cloth Hangars",
      "Ceiling fan",
      "Hand sanitizer",
    ],
    images: [
      "/images/red-cottage-front-view.png",
      "/images/red-cottage-bed2view-1.jpg",
      "/images/red-cottage-bed-3-1.jpg",
      "/images/red-cottage-dining-1.jpg",
      "/images/red-cottage-bathroom-1.jpg",
      "/images/red-cottage-hall-1.jpg",
      "/images/red-cottage-entrance-1.jpg",
    ],
    displayOrder: 1,
  },
  {
    slug: "tarry-cottage",
    name: "Tarry Cottage",
    tagline: "Wake up to peaceful views and lush greenery.",
    description:
      "The only cottage on the property with air conditioning, and the one guests tell us they get the least done in — in the best way. A wide veranda looks straight out over the garden, and it's the cottage we point reading-minded guests toward, since something about the light here makes an afternoon disappear. One room, comfortably fitted for up to six.",
    capacitySummary: "1 room, 6 guests maximum",
    areaSqm: null,
    amenities: [
      "Air conditioning",
      "Trash cans",
      "Wardrobe/Closet",
      "Fan",
      "Tile/Marble floor",
      "Private bathroom",
      "Toilet paper",
      "Toiletries",
      "Bathrobe",
      "Shower",
      "Bottle of Water",
      "Electric kettle",
      "Linens",
      "Towels",
      "TV",
      "Cloth Hangars",
      "Bed linen",
      "Shower gel",
      "Hand sanitizer",
    ],
    images: [
      "/images/veranta-view-3.jpg",
      "/images/bedroom-view-3.jpg",
      "/images/bathroom-view-1.jpg",
      "/images/hut-washroom-1.jpg",
      "/images/bedroom-view2-1.jpg",
      "/images/garden-view-wide-1.jpg",
      "/images/veranta-view2-1.jpg",
    ],
    displayOrder: 2,
  },
  {
    slug: "sparrow-hut",
    name: "Sparrow Hut",
    tagline: "Made for togetherness, wrapped in quiet comfort.",
    description:
      "The smallest and quietest of the four, set apart from the others in its own fold of greenery. Built for two or three who want the property at its most private — no shared walls, no passing traffic, just whatever's nesting in the roof for company. It's a short walk from the bamboo café, close enough if you want company without leaving your own corner of the grounds.",
    capacitySummary: "1 room, 3 guests maximum",
    areaSqm: null,
    amenities: [
      "Bed linen",
      "Body soap",
      "Bottle of Water",
      "Ceiling fan",
      "Cloth Hangars",
      "Electric kettle",
      "Fan",
      "Free toiletries",
      "Hand sanitizer",
      "Linens",
      "Private bathroom",
      "Shower",
      "Shower gel",
      "Telephone",
      "Tile/Marble floor",
      "Toilet",
      "Toilet paper",
      "Toiletries",
      "Towels",
      "Trash cans",
      "TV",
      "Wardrobe/Closet",
    ],
    images: [
      "/images/hut-main-view-1.jpg",
      "/images/hut-bed-room-1.jpg",
      "/images/bamboo-cafe-1.jpg",
      "/images/hut-washroom-1.jpg",
      "/images/hut-veranda-view-1.jpg",
    ],
    displayOrder: 3,
  },
  {
    slug: "eyrie-cottage",
    name: "Eyrie Cottage",
    tagline: "A stay that feels hidden away from the world.",
    description:
      "Set highest on the property, with the view the name promises — an eyrie is where a hawk builds its nest, above everything else, and this cottage sits the same way. It has the best seat on the property for a sunset over the valley. A quiet path climbs up past the garden to reach it, so even the walk in is part of the stay.",
    capacitySummary: "1 room, 3 guests maximum",
    areaSqm: null,
    amenities: [
      "Air conditioning",
      "Bed linen",
      "Body soap",
      "Bottle of Water",
      "Ceiling fan",
      "Cloth Hangars",
      "Clothes rack",
      "Electric kettle",
      "Fan",
      "Free toiletries",
      "Hand sanitizer",
      "Private bathroom",
      "Shower",
      "Shower gel",
      "Telephone",
      "Tile/Marble floor",
      "Toilet",
      "Toilet paper",
      "Toiletries",
      "Towels",
      "Trash cans",
      "TV",
      "Wardrobe/Closet",
    ],
    images: [
      "/images/cottage-front-view1.jpg",
      "/images/cottage4-bed1.jpg",
      "/images/cottage4-bed-view1.jpg",
      "/images/cottage4-washroom1.jpg",
      "/images/path-view-1.jpg",
      "/images/garden-view-1.jpg",
    ],
    displayOrder: 4,
  },
];

export type ExperienceSeed = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  duration: string;
  cost: string;
  included: string[];
  images: string[];
  displayOrder: number;
};

export const experiencesSeed: ExperienceSeed[] = [
  {
    slug: "bonfire-stargazing-2",
    title: "Bonfire & Stargazing",
    summary: "On clear nights at this elevation, the stars in Munnar feel close enough to disturb.",
    content:
      "An unscheduled evening in an open grove behind the cottages, about a three-minute walk from the main buildings, positioned to keep light from interfering with the night sky. When the mist clears, the sky opens — on clear nights you can see the Milky Way overhead without any guidance needed. No set program, no fixed timing.",
    duration: "Most guests stay about an hour, though you're welcome as long as the fire lasts.",
    cost: "Complimentary for all guests in residence",
    included: [
      "Fire setup and maintenance",
      "Wooden chairs and low benches",
      "Warm blankets",
      "Hot beverages — chai, coffee, or hot chocolate",
      "Guitar most nights, host-dependent",
    ],
    images: [
      "/images/bonfirre-stargazing.png",
      "/images/bonfire-rosary-nest.png",
      "/images/night-at-rosary-nest.png",
    ],
    displayOrder: 1,
  },
  {
    slug: "farm-to-table-dining",
    title: "Farm-to-Table Dining",
    summary: "Simple food, mostly from what grows here.",
    content:
      "Most ingredients come from the family's garden or neighbouring farms — honest, seasonal cooking prepared the way the family eats, not restaurant-style. Breakfast brings fresh fruit, hot bread, eggs from their own birds, and masala chai or filter coffee, included with every stay. Lunch is light and flatbread-led, suited to Munnar's afternoon rest. Dinner is the main event: three or four small courses, on the deck or in the dining room depending on weather. We don't run a restaurant. We cook the way we cook for ourselves, and set a place for our guests at that table.",
    duration: "Breakfast daily; lunch and dinner on request",
    cost: "Breakfast included · lunch & dinner on request",
    included: [
      "Breakfast with every stay",
      "Lunch and dinner available with a day's notice",
      "Vegetarian, vegan, gluten-free, Jain, and allergy accommodations",
      "Adjusted portions and spice levels for children",
      "Birthday cakes with advance notice",
    ],
    images: [
      "/images/nest-breakfast.png",
      "/images/dinnerr-at-nest.png",
      "/images/kerala-breakfast-at-rosary-nest.png",
    ],
    displayOrder: 2,
  },
  {
    slug: "lake-walks",
    title: "Lake Walks",
    summary: "A short walk from the cottage, under ten minutes. Often the best part of the day.",
    content:
      "A short downhill walk, under ten minutes, through tea bushes and wildflowers to a small clearing with a wooden seat by the water. Mirror-still on clear mornings, mist-veiled in fog — herons show up sometimes, or it's just you and the water. Come at dawn, midday, or golden hour; nothing about it is scheduled.",
    duration: "Under ten minutes downhill, plus however long you stay",
    cost: "Free — no booking or schedule required",
    included: [
      "Access to the maintained, unpaved walking path",
      "Walking sticks at the cottage door",
      "A flask of chai or coffee with advance notice",
      "Guided walks on request, led by family or staff",
    ],
    images: ["/images/dam-sengulam-munnar.png", "/images/tea-munnar-dam.png", "/images/tea-plantation.png"],
    displayOrder: 3,
  },
  {
    slug: "forest-trails",
    title: "Forest Trails",
    summary: "The forest is older than the cottages. Walk into it slowly.",
    content:
      "Two informal trails through a managed hill forest of eucalyptus, silver oak, cardamom, and pepper — a working Western Ghats ecosystem rather than wilderness. The shorter trail is about 20 minutes return, through cardamom to a valley-view clearing. The longer loop is about an hour, crossing a small stream to an old stone wall. Mostly flat, no technical difficulty; the longer trail may close in heavy monsoon.",
    duration: "20 minutes (short loop) or about an hour (long loop)",
    cost: "Complimentary",
    included: [
      "Hand-drawn trail map at the front desk",
      "Walking sticks provided",
      "First walk usually accompanied by a family member",
      "Self-guided walks afterward",
      "Naturalist-led walks with a day's notice",
    ],
    images: ["/images/forest-trail.png", "/images/garden-view-1-1.jpg", "/images/path-view-wide-1.jpg"],
    displayOrder: 4,
  },
  // TODO: draft copy pending real photos and confirmed details (hours, towel/
  // lounger service) from the family — swap the placeholder image and verify
  // the wording below before launch.
  {
    slug: "the-pool",
    title: "The Pool",
    summary: "A quiet plunge pool on the upper terrace, for the few afternoons Munnar gets properly warm.",
    content:
      "Added more recently than the cottages, the pool sits on the upper terrace nearest the main house — unheated, and mostly reserved for the handful of warm afternoons the hills allow each year. It looks out toward the valley, so even a short swim comes with the same view as everywhere else on the property. Nothing is scheduled around it; guests use it when the light and the weather agree.",
    duration: "Open through daylight hours — ask at the house if you'd like it to yourself for a while.",
    cost: "Complimentary for all guests in residence",
    included: [
      "Pool towels",
      "Loungers on the terrace",
      "A changing area close by",
    ],
    images: ["/images/placeholder-coming-soon.svg"],
    displayOrder: 5,
  },
];

export type PostSeed = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string;
  publishedAt: string;
};

export const postsSeed: PostSeed[] = [
  {
    slug: "munnar-in-monsoon-what-changes",
    title: "Munnar in monsoon: what changes.",
    excerpt:
      "The first sign that the monsoon has arrived is never the rain. It is the silence, three or four nights running, after the cicadas stop — and then a wind comes up the valley smelling of something older than the property.",
    content:
      "The first sign that the monsoon has arrived is never the rain. It is the silence, three or four nights running, after the cicadas stop — and then a wind comes up the valley smelling of something older than the property. The rain follows a day or two later, and once it starts it rarely bothers to stop properly again until September.\n\nWe stay open through June, July, and August, though we won't pretend it's the season most people picture when they book a hill-station holiday. The cottages fill more slowly. The family settles into a quieter rhythm — fewer guests to seat at the long table, more time to stand at the kitchen door and watch the rain come sideways across the terraces. The generator gets tested more often than it needs to be. Umbrellas live by every door, used more as a formality than a real defense against water that seems to arrive from four directions at once.\n\nWhat the monsoon does to the land, it does generously. Mushrooms appear overnight in places that were bare grass a week before. The frogs get louder and, we swear, larger. Waterfalls that don't exist in January show up on the drive in, briefly, gone again by November. This is the season we recommend to almost no one — the roads are slower, the views come and go with the mist — and it is also the one that the handful of guests who ask for it specifically never seem to forget.",
    category: "The Land",
    author: "The Family",
    featuredImage: "/images/monsoon-rain-munnar.png",
    publishedAt: "2026-07-12",
  },
  {
    slug: "a-morning-in-the-kitchen",
    title: "A morning in the kitchen, when the mist hasn't lifted.",
    excerpt: "Filter coffee, the radio quiet, and what we put on the long table at eight — from a kitchen that starts working two hours before any guest is awake.",
    content:
      "Our cook has been in the kitchen since six. By the time most guests are stirring, the batter for the day's appam has already had its overnight ferment checked and approved, the stew is somewhere in its second hour on a low flame, and the filter coffee has gone through its slow drip at least twice — once for the family, once, a little later, for whoever's up first among the guests.\n\nThe radio, when it's on at all, stays low enough to lose under the sound of the pans. Nobody in this kitchen is in a hurry, which is either the whole point of the place or a happy accident of how it was always run, even before it had guests to feed. By the time the mist starts lifting off the valley — some mornings that's seven, some mornings closer to nine — the smell of appam and stew has usually found its way up to the veranda before the food itself does.\n\nBreakfast isn't plated so much as delivered to the table the way it would be delivered to family: a bit more of this if you want it, a bit less of that if the last helping didn't sit right. Nobody at RosaryNest is on a set menu. If it's in the kitchen and it's ready, it's yours.",
    category: "Kitchen",
    author: "The Family",
    featuredImage: "/images/kerala-breakfast-at-rosary-nest.png",
    publishedAt: "2026-04-10",
  },
  {
    slug: "the-walk-to-the-dam",
    title: "The walk to the dam, in five hundred steps.",
    excerpt: "An hour down and an hour back, with a flask. The path the children take, past the white stones the lake gives up every dry season.",
    content:
      "It isn't really five hundred steps — nobody has counted properly, and the family has stopped correcting the children who insist on the number every single time. But it is roughly an hour down and an hour back, with a flask of something warm, along the same path the children have been taking for years: past the tea bushes, along the lower terrace, down to where the white stones show themselves every dry season and disappear again with the first heavy rain.\n\nThe dam itself is modest — a low wall of stone and concrete holding back water that becomes, further down the valley, somebody else's irrigation. You can't see the whole of it from the path; the best view is from the far ridge, a detour most guests don't bother making on a first visit and almost always regret not making by their second. What you can see from the path is enough: still water, the occasional heron standing in it like it owns the place, and the particular quiet that comes from being somewhere with no road nearby.\n\nWe'd suggest going down in the early morning, before the mist has properly lifted, or in the last hour before dark, when the light comes in low and gold across the water. Either way, take the flask. The walk back up is slower than the walk down, and it's a nicer place to stop for ten minutes than most.",
    category: "Walks",
    author: "The Family",
    featuredImage: "/images/dam-sengulam-munnar.png",
    publishedAt: "2026-03-08",
  },
  {
    slug: "whats-in-the-garden-in-february",
    title: "What's in the garden in February, and what isn't.",
    excerpt: "The cardamom is in flower. The pepper is patient. Most of what lands on the table that evening was still in the ground at breakfast.",
    content:
      "The cardamom is in flower by February, small pale clusters low on the plant, easy to miss if you're not looking for them and impossible to miss once someone's pointed them out. It'll be months yet before there's anything to harvest — cardamom asks for patience the way most things worth growing do — but the flowering is its own small event, and the family still checks the beds for it every year like it's news.\n\nThe pepper vines climbing the silver oak are doing very little that's visible, which is exactly what they're supposed to be doing in February. Everything underground is working; nothing above ground is in a rush to show it. It's a useful thing to remember about this garden generally — most of what matters here happens slowly, out of sight, on a schedule nobody's in control of.\n\nWhat does show up in February: greens, always; a stretch of good tomatoes if the frost has been kind; whatever herbs haven't minded the cold nights. The family walks the beds most mornings before the market run into town, less to inspect than out of habit, and more often than not, whatever gets pulled that morning is what ends up on the dinner table that evening — no real distance between the garden and the plate, and no real plan beyond what's ready.",
    category: "Garden",
    author: "The Family",
    featuredImage: "/images/tea-plantation.png",
    publishedAt: "2026-02-14",
  },
  {
    slug: "how-we-came-to-keep-a-guesthouse",
    title: "How we came to keep a guesthouse, by accident.",
    excerpt: "My grandfather grew cardamom. My father, briefly, sold it. I make beds — and none of it was planned quite this way.",
    content:
      "My grandfather farmed this land. He planted the first cardamom here, on terraces he cut into the hill himself, and he farmed it the way people farmed then — through good seasons that paid for the next bad one, and bad ones that tested whether the family would keep at it. My father inherited that same rhythm and, for a while, the same trade: cardamom mostly, with pepper and a little coffee at the edges, sold the way it had always been sold, through the same routes and the same buyers his father had used.\n\nBy 2009 the arithmetic had stopped working the way it once did. Prices had gone thin, the seasons had gotten harder to predict, and the family that had once worked this land together had, like most families, scattered a little — some to the city, some abroad, none of them farming full-time anymore. My father stopped working the plantation the way it had been worked for two generations, and for a while nobody quite knew what the land was for.\n\nWhat we didn't want to do was sell it, or let it sit empty and slowly go back to forest on its own terms. So we did something closer to the opposite: we opened it up. One cottage first, built more or less where a barn used to stand, then a second, then two more, each one going up between the trees that were already there rather than clearing space for something grander. We are not innkeepers by training or temperament. We are a family who happened to have some land we loved and a few extra rooms, and who decided that sharing both was better than watching either sit idle. I still don't think of myself as running a hotel. Mostly, I just make sure the beds are ready before anyone arrives to sleep in them.",
    category: "The Family",
    author: "The Family",
    featuredImage: "/images/garden-view-1.jpg",
    publishedAt: "2026-01-20",
  },
  {
    slug: "appam-in-the-slow-way",
    title: "Appam, in the slow way.",
    excerpt: "A lace pancake that takes a day to start and ten minutes to make — and, according to our cook, is always better on the second day.",
    content:
      "Appam has a reputation for being difficult that it doesn't entirely deserve — what it actually demands is patience rather than skill. The batter is rice and coconut, blended fine, left to ferment overnight with a little help from toddy or yeast depending on who's making it and what's on hand. By morning it should have risen and gone faintly sour in the good way, bubbling gently if you tap the bowl.\n\nOur cook swears, with the confidence of someone who has made this thousands of times, that second-day batter always makes better lace than first-day batter — something about the fermentation settling into itself overnight that a few extra hours won't replicate if you rush it. We've never found a reason to argue with her about it.\n\nCooking it is the fast part: a hot, well-seasoned appachatti, a ladle of batter swirled quickly around the edges so it thins out to lace at the rim and stays soft and a little spongy in the center, a lid on for a minute or two, and it's done. Served with a vegetable stew, or with the sweet coconut milk version we sometimes make for a slower Sunday breakfast, it's the kind of dish that rewards someone who started it the night before and disappoints anyone trying to shortcut it the same morning.",
    category: "Recipes",
    author: "The Family",
    featuredImage: "/images/nest-breakfast.png",
    publishedAt: "2025-12-05",
  },
];

export type FaqSeed = { question: string; answer: string; category: string; displayOrder: number };

export const faqsSeed: FaqSeed[] = [
  // Before you book
  { category: "Before you book", displayOrder: 1, question: "What is your cancellation policy?", answer: "We don't offer refunds once a booking is confirmed. That said, life happens — write to us if something comes up and we'll work it out with you case by case." },
  { category: "Before you book", displayOrder: 2, question: "How do I pay, and when?", answer: "Payment is handled securely through our booking system when you reserve — no need to email details back and forth. If you would rather book by phone or WhatsApp, write to us and we will send a payment link." },
  { category: "Before you book", displayOrder: 3, question: "Can we bring children?", answer: "Yes, gladly. We don't have a kids' club or a babysitter on staff, and there's a fast-flowing stream below the lower terrace, so toddlers need supervision. Older children (eight and up) tend to love the place." },
  { category: "Before you book", displayOrder: 4, question: "Do you accept pets?", answer: "We don't, mainly because the property has two resident dogs and a half-feral kitchen cat who would rather not share. Service animals are an exception — please tell us in advance." },
  { category: "Before you book", displayOrder: 5, question: "Is the property accessible?", answer: "Some cottages involve steps and uneven paths — tell us about mobility needs when you book and we'll recommend the right one." },
  // Getting here
  { category: "Getting here", displayOrder: 1, question: "How bad is the road in monsoon?", answer: "The main road is fine — a well-maintained state highway. The last three kilometres up to the property are slow and slippery in heavy rain. We can send a 4×4 from Munnar town if your driver isn't comfortable with the last stretch." },
  { category: "Getting here", displayOrder: 2, question: "What if I arrive late?", answer: "We'll wait up. Write or call as soon as you know — we'll keep the kitchen open and walk you up from the gate with a lantern. There's no surcharge for late arrival." },
  { category: "Getting here", displayOrder: 3, question: "Is there parking?", answer: "Yes, sixty metres below the upper veranda. Covered, secure, and within easy walking distance of every cottage." },
  // Your stay
  { category: "Your stay", displayOrder: 1, question: "What time is check-in and check-out?", answer: "Check-in from 2 pm, check-out by 11 am. Early arrival or late departure usually works — ask when you book and we'll do what we can." },
  { category: "Your stay", displayOrder: 2, question: "I'm vegetarian / gluten-free / allergic to —. Will that work?", answer: "Yes. Tell us in advance and our cook will plan around it. Our kitchen is fundamentally Kerala — rice, coconut, vegetables, fresh fish — and adapts easily. We don't do a buffet, so no cross-contamination concerns." },
  { category: "Your stay", displayOrder: 3, question: "Do you serve alcohol?", answer: "We don't have a bar. You're welcome to bring your own wine, beer, or spirits, and we'll provide glassware, ice, and a corkscrew. The closest off-licence is in Munnar town, twenty minutes away." },
  { category: "Your stay", displayOrder: 4, question: "Is there wifi?", answer: "Yes, throughout the property, though it slows in heavy rain. Strong enough for email, video calls, and a film if you must. Not strong enough for serious work — and we'd quietly prefer that you didn't try." },
  { category: "Your stay", displayOrder: 5, question: "Can I get laundry done?", answer: "Yes, same-day if it's in by 9 am, weather permitting. Hand-washed, sun-dried, folded. There's no charge for a small load; longer stays get a small bill at the end." },
  // Things to do
  { category: "Things to do", displayOrder: 1, question: "What's there to do off the property?", answer: "More than you'd think. Tea-estate walks, Eravikulam Park, the dam, Top Station, the spice plantations. We have a small set of curated routes; ask at breakfast and we'll print you a sheet." },
  { category: "Things to do", displayOrder: 2, question: "Do you work with the surrounding tea estates?", answer: "Yes — three of them. We can arrange a tea-pluck-and-taste morning, lunch in a planter's bungalow, or a guided walk through the higher slopes. All small, all by appointment." },
  { category: "Things to do", displayOrder: 3, question: "Can you arrange a driver for the day?", answer: "Yes, our driver brings most guests up from Cochin and knows where to stop and where not to — we can arrange this, ask us when you book." },
  // The cottages
  { category: "The cottages", displayOrder: 1, question: "Which cottage should I pick?", answer: "Quietest is Sparrow Hut. Most reading-friendly is Tarry Cottage. Best for valley sunsets is Eyrie Cottage. Write to us and we'll help you find the right fit." },
  { category: "The cottages", displayOrder: 2, question: "Is there room service?", answer: "Tea and breakfast can come to your veranda. Lunch and dinner are at the long table, weather permitting, or in the dining room when it isn't. We'll bring dinner to the cottage if you ask." },
  { category: "The cottages", displayOrder: 3, question: "Can we have extra bedding?", answer: "Always. Wool blankets, cotton throws, hot-water bottles in January. Just ask, or pull what you need from the linen cupboard in your cottage." },
];

export type GalleryItemSeed = { imageUrl: string; caption: string; category: string; displayOrder: number };

export const galleryItemsSeed: GalleryItemSeed[] = [
  { category: "land", displayOrder: 1, imageUrl: "/images/munnar-beauty.jpg", caption: "Valley at first light, late January." },
  { category: "cottages", displayOrder: 2, imageUrl: "/images/cottage-front-view1.jpg", caption: "Eyrie Cottage, west veranda." },
  { category: "food", displayOrder: 3, imageUrl: "/images/kerala-breakfast-at-rosary-nest.png", caption: "Appam, stew, banana leaf." },
  { category: "land", displayOrder: 4, imageUrl: "/images/dam-sengulam-munnar.png", caption: "The lake, six in the morning." },
  { category: "seasons", displayOrder: 5, imageUrl: "/images/monsoon-rain-munnar.png", caption: "Tea slope, second week of July." },
  { category: "cottages", displayOrder: 6, imageUrl: "/images/veranta-view-3.jpg", caption: "Outdoor veranda, Sparrow Hut." },
  { category: "food", displayOrder: 7, imageUrl: "/images/dinnerr-at-nest.png", caption: "The long table, dinner." },
  { category: "land", displayOrder: 8, imageUrl: "/images/path-view-1.jpg", caption: "The lower path to the dam." },
  { category: "cottages", displayOrder: 9, imageUrl: "/images/bedroom-view-3.jpg", caption: "Inside Sparrow Hut at noon." },
  { category: "seasons", displayOrder: 10, imageUrl: "/images/tea-plantation.png", caption: "Tea slope below the property." },
  { category: "food", displayOrder: 11, imageUrl: "/images/nest-breakfast.png", caption: "Breakfast on the veranda." },
  { category: "cottages", displayOrder: 12, imageUrl: "/images/hut-main-view-1.jpg", caption: "Sparrow Hut, exterior view." },
  { category: "land", displayOrder: 13, imageUrl: "/images/garden-view-1.jpg", caption: "The garden, early morning." },
  { category: "seasons", displayOrder: 14, imageUrl: "/images/bonfire-rosary-nest.png", caption: "Bonfire, cold-season evening." },
  { category: "cottages", displayOrder: 15, imageUrl: "/images/red-cottage-front-view.png", caption: "Tarry Cottage, front view." },
  { category: "food", displayOrder: 16, imageUrl: "/images/bamboo-cafe.png", caption: "The bamboo café, midday light." },
];
