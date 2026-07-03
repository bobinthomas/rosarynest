// Seed content ported from the live RosaryNest WordPress site (techyminds.in/rsn),
// scraped via its REST API and rendered HTML. Used to populate local D1 for
// development, and as the canonical starting point for admin-editable content.

export const settingsSeed: Record<string, string> = {
  logo_url: "/images/RosaryNest-animated1.svg",
  hero_media_type: "video",
  hero_image_url: "",
  hero_video_url: "/video/Hero-new.mp4",
  site_name: "RosaryNest",
  tagline: "where stillness stays",
  established_year: "1998",
  phone: "+91 484 000 0000",
  whatsapp: "+91 484 000 0000",
  email: "stay@rosarynest.in",
  address_line1: "Rosary Nest, Anachal · Chithirapuram",
  address_line2: "Vellathooval Road, Munnar, Idukki, Kerala 685612, India",
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
  areaSqm: number;
  amenities: string[];
  images: string[];
  displayOrder: number;
};

export const cottagesSeed: CottageSeed[] = [
  {
    slug: "the-garden-cottage",
    name: "Tarry Cottage",
    tagline: "Mornings begin near the water.",
    description:
      "A quiet two-bedroom cottage set amidst misty greens, just a short walk from the lake. For guests who arrive intending to explore Munnar — and slowly decide not to rush anywhere at all. Not a place built around activity. It is built around pause. Warm wood, soft linen, muted tones, and spaces that invite rest rather than distraction, with natural light, fog views, and garden vistas through large windows.",
    capacitySummary: "2 bedrooms · king bed + private bedroom",
    areaSqm: 30,
    amenities: [
      "Garden-facing orientation",
      "Private wooden sit-out deck",
      "Spacious bathroom with hot water",
      "Complimentary breakfast",
      "In-room tea/coffee setup",
      "Daily housekeeping",
      "WiFi (where reception allows)",
      "King-sized bedding with layered textures",
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
    slug: "the-lake-cottage",
    name: "Sparrow Hut",
    tagline: "Wake up to peaceful views and lush greenery.",
    description:
      "A stay filled with comfort and nature. Warm wooden interiors with soft natural lighting, large windows and a private balcony showcase scenic views of the resort, misty hills, and verdant landscapes. Guests can enjoy morning tea on the balcony or evening breezes. A nearby lake, accessible via a nine-minute walk, enhances the peaceful experience — meaningful comfort and memorable moments rather than luxury for its own sake.",
    capacitySummary: "For 2 guests · king bed · one of one",
    areaSqm: 56,
    amenities: [
      "Private cottage with balcony",
      "Resort and greenery views",
      "Lake access (9-minute walk)",
      "Spacious bathroom with hot water",
      "Complimentary breakfast",
      "In-room tea, coffee, and chai setup",
      "East-facing morning light",
      "Daily housekeeping",
      "Private veranda",
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
    slug: "the-family-cottage",
    name: "Scarlet Hut",
    tagline: "Made for togetherness, wrapped in quiet comfort.",
    description:
      "A spacious family cottage in Munnar designed for slow conversations and restful stays, surrounded by misty greenery. Warmth through natural textures, wooden details, and soft lighting, with large windows showcasing mountain vistas. The design favors simplicity over excess, in a place where time moves differently.",
    capacitySummary: "Family cottage · king bed",
    areaSqm: 78,
    amenities: [
      "Spacious bathroom with hot water",
      "Private deck with two chairs",
      "Complimentary breakfast",
      "Tea and coffee setup",
      "Daily housekeeping",
      "WiFi (where reception allows)",
      "Comfortable bedding and seating spaces",
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
    slug: "cottage-1",
    name: "Eyrie Cottage",
    tagline: "A stay that feels hidden away from the world.",
    description:
      "Located in lush greenery with cool mountain air, Eyrie Cottage sits at the highest point on the property. Mornings feature mist drifting through the hills with birdsong and warm light through expansive windows. Wooden textures, soft furnishings, and warm lighting are deliberately understated and personal — the quiet comfort of feeling completely at ease, rather than grand experiences.",
    capacitySummary: "Sleeps 4 · two king bedrooms · two full bathrooms",
    areaSqm: 42,
    amenities: [
      "Two king bedrooms, two full bathrooms",
      "Shared living space with seating",
      "Private sit-out space",
      "Spacious bathroom with hot water",
      "Complimentary breakfast",
      "Tea and coffee setup",
      "Daily housekeeping",
      "Highest point on the property",
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
    summary: "Five minutes from the cottage. Often the best part of the day.",
    content:
      "A five-minute downhill walk through tea bushes and wildflowers to a small clearing with a wooden seat by the water. Mirror-still on clear mornings, mist-veiled in fog — herons show up sometimes, or it's just you and the water. Come at dawn, midday, or golden hour; nothing about it is scheduled.",
    duration: "About 5 minutes downhill, plus however long you stay",
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
      "The first sign that the monsoon has arrived is not the rain. It is the silence after the cicadas stop, three or four nights in a row, and then a wind comes up the valley that smells of something older than the property.",
    content:
      "The first sign that the monsoon has arrived is not the rain. It is the silence after the cicadas stop, three or four nights in a row, and then a wind comes up the valley that smells of something older than the property.\n\nWe close, mostly, from June through August. The cottages stay dressed, the family stays on, and the rain comes sideways for weeks at a stretch. The land does what monsoons let it do — flowers, mushrooms, frogs the size of teacups. This is the time we recommend to almost no one, and the few people who know to ask for it never forget it.",
    category: "The Land",
    author: "Anna Joseph",
    featuredImage: "/images/monsoon-rain-munnar.png",
    publishedAt: "2026-07-12",
  },
  {
    slug: "a-morning-in-the-kitchen",
    title: "A morning in the kitchen, when the mist hasn't lifted.",
    excerpt: "Filter coffee, the radio quiet, and what we put on the long table at eight.",
    content:
      "Filter coffee, the radio quiet, and what we put on the long table at eight. Lakshmi has been in the kitchen since six, and by the time the mist starts to lift off the valley the smell of appam and stew has already found its way to the upper veranda.",
    category: "Kitchen",
    author: "Anna Joseph",
    featuredImage: "/images/kerala-breakfast-at-rosary-nest.png",
    publishedAt: "2026-04-10",
  },
  {
    slug: "the-walk-to-the-dam",
    title: "The walk to the dam, in five hundred steps.",
    excerpt: "An hour down and an hour back, with a flask. The path the children take.",
    content:
      "An hour down and an hour back, with a flask. The path the children take, past the tea bushes and the white stones the lake gives up every dry season, down to the dam wall that you can only really see from the far ridge.",
    category: "Walks",
    author: "Anna Joseph",
    featuredImage: "/images/dam-sengulam-munnar.png",
    publishedAt: "2026-03-08",
  },
  {
    slug: "whats-in-the-garden-in-february",
    title: "What's in the garden in February, and what isn't.",
    excerpt: "The cardamom is in flower. The pepper is patient.",
    content:
      "The cardamom is in flower. The pepper is patient. Suresh walks the beds every morning before the market run, and most of what ends up on the table that evening was still in the ground at breakfast.",
    category: "Garden",
    author: "Suresh",
    featuredImage: "/images/tea-plantation.png",
    publishedAt: "2026-02-14",
  },
  {
    slug: "how-we-came-to-keep-a-guesthouse",
    title: "How we came to keep a guesthouse, by accident.",
    excerpt: "My grandfather grew cardamom. My father, briefly, sold it. I make beds.",
    content:
      "My grandfather grew cardamom. My father, briefly, sold it. I make beds. He arrived with permission and hand tools, clearing evergreen forest to plant cardamom, living in a hut for two years while the road was built. My father stopped farming it in 2009 — prices, seasons, the family scattering — and we decided to repurpose the land rather than let it sit. We are not innkeepers. We are people who happen to have extra rooms on land we love.",
    category: "The Family",
    author: "Roy",
    featuredImage: "/images/garden-view-1.jpg",
    publishedAt: "2026-01-20",
  },
  {
    slug: "appam-in-the-slow-way",
    title: "Appam, in the slow way.",
    excerpt: "A recipe for the lace pancake that takes a day to start and ten minutes to make.",
    content:
      "A recipe for the lace pancake that takes a day to start and ten minutes to make. The batter needs to sit overnight, and Lakshmi swears the second-day batter always makes better lace than the first.",
    category: "Recipes",
    author: "Lakshmi",
    featuredImage: "/images/nest-breakfast.png",
    publishedAt: "2025-12-05",
  },
];

export type FaqSeed = { question: string; answer: string; category: string; displayOrder: number };

export const faqsSeed: FaqSeed[] = [
  // Before you book
  { category: "Before you book", displayOrder: 1, question: "What is your cancellation policy?", answer: "Full refund up to 21 days before arrival. Within 21 days, we hold 50% as a future-stay credit. We're flexible in genuine cases — write to us, we'd rather talk it through." },
  { category: "Before you book", displayOrder: 2, question: "How do I pay, and when?", answer: "A 30% deposit holds your booking; the balance is due on arrival, by card, bank transfer, or UPI. We don't store card details. International guests usually pay by bank transfer; we'll send details when you book." },
  { category: "Before you book", displayOrder: 3, question: "Can we bring children?", answer: "Yes, gladly — particularly in the Family Cottage. We don't have a kids' club or a babysitter on staff, and there's a fast-flowing stream below the lower terrace, so toddlers need supervision. Older children (eight and up) tend to love the place." },
  { category: "Before you book", displayOrder: 4, question: "Do you accept pets?", answer: "We don't, mainly because the property has two resident dogs and a half-feral kitchen cat who would rather not share. Service animals are an exception — please tell us in advance." },
  { category: "Before you book", displayOrder: 5, question: "Is the property accessible?", answer: "Partly. The Garden Cottage and the dining veranda are reachable without stairs. The Forest and Lake Cottages involve uneven paths. Tell us your needs when you book and we'll work it out honestly." },
  // Getting here
  { category: "Getting here", displayOrder: 1, question: "How bad is the road in monsoon?", answer: "The main road is fine — a well-maintained state highway. The last three kilometres up to the property are slow and slippery in heavy rain. We can send a 4×4 from Munnar town if your driver isn't comfortable with the last stretch." },
  { category: "Getting here", displayOrder: 2, question: "What if I arrive late?", answer: "We'll wait up. Write or call as soon as you know — we'll keep the kitchen open and walk you up from the gate with a lantern. There's no surcharge for late arrival." },
  { category: "Getting here", displayOrder: 3, question: "Is there parking?", answer: "Yes, sixty metres below the upper veranda. Covered, secure, and within easy walking distance of every cottage." },
  // Your stay
  { category: "Your stay", displayOrder: 1, question: "What time is check-in and check-out?", answer: "Check-in from 2 pm, check-out by 11 am. Early arrival or late departure usually works — ask when you book and we'll do what we can." },
  { category: "Your stay", displayOrder: 2, question: "I'm vegetarian / gluten-free / allergic to —. Will that work?", answer: "Yes. Tell us in advance and Lakshmi will plan around it. Our kitchen is fundamentally Kerala — rice, coconut, vegetables, fresh fish — and adapts easily. We don't do a buffet, so no cross-contamination concerns." },
  { category: "Your stay", displayOrder: 3, question: "Do you serve alcohol?", answer: "We don't have a bar. You're welcome to bring your own wine, beer, or spirits, and we'll provide glassware, ice, and a corkscrew. The closest off-licence is in Munnar town, twenty minutes away." },
  { category: "Your stay", displayOrder: 4, question: "Is there wifi?", answer: "Yes, throughout the property, though it slows in heavy rain. Strong enough for email, video calls, and a film if you must. Not strong enough for serious work — and we'd quietly prefer that you didn't try." },
  { category: "Your stay", displayOrder: 5, question: "Can I get laundry done?", answer: "Yes, same-day if it's in by 9 am, weather permitting. Hand-washed, sun-dried, folded. There's no charge for a small load; longer stays get a small bill at the end." },
  // Things to do
  { category: "Things to do", displayOrder: 1, question: "What's there to do off the property?", answer: "More than you'd think. Tea-estate walks, Eravikulam Park, the dam, Top Station, the spice plantations. We have a small set of curated routes; ask at breakfast and we'll print you a sheet." },
  { category: "Things to do", displayOrder: 2, question: "Do you work with the surrounding tea estates?", answer: "Yes — three of them. We can arrange a tea-pluck-and-taste morning, lunch in a planter's bungalow, or a guided walk through the higher slopes. All small, all by appointment." },
  { category: "Things to do", displayOrder: 3, question: "Can you arrange a driver for the day?", answer: "Yes. Kurian (who brings most guests up from Cochin) does day trips for ₹3,500 with fuel included. He knows where to stop and where not to." },
  // The cottages
  { category: "The cottages", displayOrder: 1, question: "Which cottage should I pick?", answer: "Quietest is Sparrow Hut (the Lake Cottage). Most reading-friendly is Tarry Cottage (the Garden Cottage). Best for valley sunsets is Eyrie Cottage. For families or two couples, Scarlet Hut. Write to us if you'd like a recommendation." },
  { category: "The cottages", displayOrder: 2, question: "Is there room service?", answer: "Tea and breakfast can come to your veranda. Lunch and dinner are at the long table, weather permitting, or in the dining room when it isn't. We'll bring dinner to the cottage if you ask." },
  { category: "The cottages", displayOrder: 3, question: "Can we have extra bedding?", answer: "Always. Wool blankets, cotton throws, hot-water bottles in January. Just ask, or pull what you need from the linen cupboard in your cottage." },
];

export type GalleryItemSeed = { imageUrl: string; caption: string; category: string; displayOrder: number };

export const galleryItemsSeed: GalleryItemSeed[] = [
  { category: "land", displayOrder: 1, imageUrl: "/images/munnar-beauty.jpg", caption: "Valley at first light, late January." },
  { category: "cottages", displayOrder: 2, imageUrl: "/images/cottage-front-view1.jpg", caption: "The Forest Cottage, west veranda." },
  { category: "food", displayOrder: 3, imageUrl: "/images/kerala-breakfast-at-rosary-nest.png", caption: "Appam, stew, banana leaf." },
  { category: "land", displayOrder: 4, imageUrl: "/images/dam-sengulam-munnar.png", caption: "The lake, six in the morning." },
  { category: "seasons", displayOrder: 5, imageUrl: "/images/monsoon-rain-munnar.png", caption: "Tea slope, second week of July." },
  { category: "cottages", displayOrder: 6, imageUrl: "/images/veranta-view-3.jpg", caption: "Outdoor veranda, Lake Cottage." },
  { category: "food", displayOrder: 7, imageUrl: "/images/dinnerr-at-nest.png", caption: "The long table, dinner." },
  { category: "land", displayOrder: 8, imageUrl: "/images/path-view-1.jpg", caption: "The lower path to the dam." },
  { category: "cottages", displayOrder: 9, imageUrl: "/images/bedroom-view-3.jpg", caption: "Inside the Lake Cottage at noon." },
  { category: "seasons", displayOrder: 10, imageUrl: "/images/tea-plantation.png", caption: "Tea slope below the property." },
  { category: "food", displayOrder: 11, imageUrl: "/images/nest-breakfast.png", caption: "Breakfast on the veranda." },
  { category: "cottages", displayOrder: 12, imageUrl: "/images/hut-main-view-1.jpg", caption: "Scarlet Hut, family cottage." },
  { category: "land", displayOrder: 13, imageUrl: "/images/garden-view-1.jpg", caption: "The garden, early morning." },
  { category: "seasons", displayOrder: 14, imageUrl: "/images/bonfire-rosary-nest.png", caption: "Bonfire, cold-season evening." },
  { category: "cottages", displayOrder: 15, imageUrl: "/images/red-cottage-front-view.png", caption: "Tarry Cottage, front view." },
  { category: "food", displayOrder: 16, imageUrl: "/images/bamboo-cafe.png", caption: "The bamboo café, midday light." },
];
