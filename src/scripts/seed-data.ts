const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const categorySeed = [
  {
    name: "Electronics & Gadgets",
    slug: "electronics-gadgets",
    description: "Audio, displays, and compact tech chosen for apartments and commutes in the UAE.",
    image: photo("photo-1518770660439-4636190af475"),
    sortOrder: 1,
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Cookware and small tools that earn a place in a smaller kitchen.",
    image: photo("photo-1556911220-e15b29be8c8f"),
    sortOrder: 2,
  },
  {
    name: "Fashion & Accessories",
    slug: "fashion-accessories",
    description: "Breathable clothing and everyday accessories for a warm climate.",
    image: photo("photo-1490481651871-ab68de25d43d"),
    sortOrder: 3,
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    description: "Daily care with a focus on sun, hair, and simple routines.",
    image: photo("photo-1596462502278-27bfdc403348"),
    sortOrder: 4,
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    description: "Training gear for indoor workouts and early outdoor sessions.",
    image: photo("photo-1517836357463-d25dfeac3438"),
    sortOrder: 5,
  },
  {
    name: "Baby & Kids",
    slug: "baby-kids",
    description: "A short list of nursery and comfort items for young families.",
    image: photo("photo-1515488042361-ee00e0ddd4e4"),
    sortOrder: 6,
  },
  {
    name: "Office & Stationery",
    slug: "office-stationery",
    description: "Desk tools for working from a spare room or a quiet corner.",
    image: photo("photo-1497366216548-37526070297c"),
    sortOrder: 7,
  },
  {
    name: "Travel Essentials",
    slug: "travel-essentials",
    description: "Carry pieces for weekend trips around the Emirates and beyond.",
    image: photo("photo-1488646953014-85cb44e25828"),
    sortOrder: 8,
  },
];

type ProductSeed = {
  name: string;
  slug: string;
  category: string;
  brand: string;
  shortDescription: string;
  description: string;
  images: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  pros: string[];
  cons: string[];
  keyword: string;
  price: number;
  featured?: boolean;
  trending?: boolean;
  isNewArrival?: boolean;
  isDeal?: boolean;
};

export const productSeed: ProductSeed[] = [
  {
    name: "Aurora ANC Earbuds",
    slug: "aurora-anc-earbuds",
    category: "electronics-gadgets",
    brand: "Lumen Lab",
    shortDescription: "Compact noise-cancelling earbuds for metro rides and open-plan offices.",
    description: "Aurora is a demonstration audio pick for people who spend time in transit or in a busy office. The catalogue entry focuses on fit, battery life, and whether active noise cancelling is worth it for short journeys.\n\nThis is sample editorial content. Confirm the real model, specifications, and price on Amazon.ae before you buy.",
    images: [photo("photo-1590658268037-6bf12165a8df"), photo("photo-1505740420928-5e560c06d30e")],
    features: ["Active noise cancelling for commuting", "Compact case for a small bag", "Touch controls", "Demonstration specification set"],
    specifications: [
      { label: "Type", value: "In-ear, demonstration" },
      { label: "Use", value: "Commute and desk" },
      { label: "Sample battery", value: "About a working day with the case" },
    ],
    pros: ["Useful if trains and open offices are part of your week", "Small enough to leave in a work bag"],
    cons: ["Less relevant if you only listen at home", "Ear-tip fit varies and should be checked on the product page"],
    keyword: "noise cancelling earbuds",
    price: 349,
    featured: true,
    trending: true,
  },
  {
    name: "Lumen 4K Portable Projector",
    slug: "lumen-4k-projector",
    category: "electronics-gadgets",
    brand: "Lumen Lab",
    shortDescription: "A portable projector demonstration for movie nights in a darkened room.",
    description: "The Lumen projector entry is here to show how XSelect would present a larger gadget: what room it needs, and why brightness matters more than a resolution badge.\n\nTreat the specification table as sample content until a real, authorised product replaces it.",
    images: [photo("photo-1478720568477-152d9b164e26")],
    features: ["Intended for dark rooms", "Portable enough to move between rooms", "Needs a clear wall or screen"],
    specifications: [
      { label: "Type", value: "Portable projector, demonstration" },
      { label: "Best room", value: "Darkened living room" },
    ],
    pros: ["Makes sense for occasional film nights", "Easier to store than a large television"],
    cons: ["A bright apartment will wash the picture out", "Sound from compact projectors is often secondary"],
    keyword: "portable projector",
    price: 1299,
    isNewArrival: true,
  },
  {
    name: "Noura Cast-Iron Casserole",
    slug: "noura-cast-iron-casserole",
    category: "home-kitchen",
    brand: "Harbor & Co",
    shortDescription: "A heavy casserole for rice, stews, and weekend cooking.",
    description: "Noura stands in for the kind of pot that earns a permanent spot on the hob. The notes cover weight, heat retention, and who should skip cast iron.\n\nImages are stock photography, not the manufacturer's pack shot.",
    images: [photo("photo-1556909114-f6e7ad7d3136")],
    features: ["Even heat for long cooks", "Oven and hob use in the sample brief", "Needs seasoning care"],
    specifications: [
      { label: "Material", value: "Cast iron, demonstration" },
      { label: "Best for", value: "Stews and rice" },
    ],
    pros: ["Good if you cook the same family dishes often", "Holds heat after the burner is off"],
    cons: ["Heavy for a high shelf", "Not the fastest option for a weeknight fry"],
    keyword: "cast iron casserole",
    price: 289,
    featured: true,
    isDeal: true,
  },
  {
    name: "Cedar Pour-Over Kettle",
    slug: "cedar-pour-over-kettle",
    category: "home-kitchen",
    brand: "Harbor & Co",
    shortDescription: "A gooseneck kettle for people who already make coffee at home.",
    description: "Cedar is a small kitchen demonstration. It is relevant if you brew by hand and care about a controlled pour. It is unnecessary if a standard kettle already does the job.\n\nConfirm capacity and materials on Amazon before purchasing.",
    images: [photo("photo-1514228742587-6b1558fcca3d")],
    features: ["Gooseneck spout", "Countertop scale", "Demonstration product"],
    specifications: [
      { label: "Use", value: "Pour-over coffee" },
      { label: "Sample capacity", value: "About 800 ml" },
    ],
    pros: ["Helpful if you already own a dripper", "Takes little storage space"],
    cons: ["Slow if you only boil water for tea", "A narrow spout needs a steady hand"],
    keyword: "gooseneck kettle",
    price: 179,
    trending: true,
  },
  {
    name: "Marina Linen Shirt",
    slug: "marina-linen-shirt",
    category: "fashion-accessories",
    brand: "Northline",
    shortDescription: "A breathable shirt demonstration for warm days and air-conditioned offices.",
    description: "Marina is sample apparel copy. Linen wrinkles, breathes, and suits a relaxed cut. The entry explains that trade-off instead of calling it universally flattering.\n\nReplace this with a real garment you are allowed to feature, including accurate sizing.",
    images: [photo("photo-1521572163474-6864f9cf17ab")],
    features: ["Breathable cloth", "Relaxed demonstration cut", "Best in dry heat"],
    specifications: [
      { label: "Fabric", value: "Linen blend, sample" },
      { label: "Occasion", value: "Warm weather" },
    ],
    pros: ["Comfortable in humidity", "Works with simple trousers"],
    cons: ["Creases easily", "A structured look needs a different cloth"],
    keyword: "linen shirt men",
    price: 189,
    isNewArrival: true,
  },
  {
    name: "Atlas Leather Cardholder",
    slug: "atlas-leather-cardholder",
    category: "fashion-accessories",
    brand: "Northline",
    shortDescription: "A slim cardholder for days when a full wallet is unnecessary.",
    description: "Atlas is a demonstration accessory. It suits people who carry cards and a little cash, and it is the wrong pick if you still need coins, keys, or a thick stack of receipts.\n\nLeather care and colour should be checked on the live product page.",
    images: [photo("photo-1627123424574-724758594e93")],
    features: ["Slim profile", "Card slots", "Demonstration leather goods entry"],
    specifications: [
      { label: "Style", value: "Cardholder" },
      { label: "Carry", value: "Cards and folded notes" },
    ],
    pros: ["Light in a shirt pocket", "Simple to replace a bulky wallet"],
    cons: ["No room for a large phone", "Leather shows wear"],
    keyword: "leather cardholder",
    price: 149,
    featured: true,
  },
  {
    name: "Oasis Daily SPF 50",
    slug: "oasis-daily-spf",
    category: "beauty-personal-care",
    brand: "Sable",
    shortDescription: "A daily sunscreen demonstration for strong Gulf sunlight.",
    description: "Oasis is sample copy about wearing SPF as a habit, not a beach-only product. We do not rank formulas or invent dermatologist endorsements.\n\nRead the ingredient list and instructions on Amazon before use.",
    images: [photo("photo-1556228720-195a672e8a03")],
    features: ["Daily face use in the sample brief", "High SPF positioning", "Not a medical claim"],
    specifications: [
      { label: "Category", value: "Sunscreen, demonstration" },
      { label: "SPF label", value: "50 in the sample brief" },
    ],
    pros: ["Relevant for year-round sun", "Easy to keep by the door"],
    cons: ["Texture preference is personal", "Sunscreen still needs reapplication"],
    keyword: "face sunscreen SPF 50",
    price: 89,
    trending: true,
    isDeal: true,
  },
  {
    name: "Saffron Hair Oil",
    slug: "saffron-hair-oil",
    category: "beauty-personal-care",
    brand: "Sable",
    shortDescription: "A light hair-oil demonstration for ends, not a treatment claim.",
    description: "Saffron Hair Oil is editorial sample content about finishing oil for dry ends. It does not promise hair growth or medical results.\n\nCheck the scent and ingredient list on the retailer page.",
    images: [photo("photo-1522338242992-e1a54906a8da")],
    features: ["Used on mid-lengths and ends in the sample routine", "Small bottle", "Demonstration only"],
    specifications: [
      { label: "Use", value: "Hair finishing oil" },
      { label: "Claims", value: "None beyond cosmetic moisture" },
    ],
    pros: ["A small step if ends feel dry", "Travels easily"],
    cons: ["Too much product looks heavy", "Scent is a matter of taste"],
    keyword: "hair oil",
    price: 119,
    isNewArrival: true,
  },
  {
    name: "Dune Yoga Mat",
    slug: "dune-yoga-mat",
    category: "sports-outdoors",
    brand: "Fieldnote",
    shortDescription: "A mat for home sessions when the outdoor heat makes a gym more practical.",
    description: "Dune is a demonstration training mat. Thickness and grip matter more than colour, and a mat is wasted if it never leaves the cupboard.\n\nMeasurements in this entry are samples.",
    images: [photo("photo-1601925260368-ae2f83cf8b7f")],
    features: ["Home practice", "Cushioned demonstration build", "Rolls for storage"],
    specifications: [
      { label: "Use", value: "Yoga and floor work" },
      { label: "Sample thickness", value: "6 mm" },
    ],
    pros: ["Useful for apartment workouts", "A clear place to start a routine"],
    cons: ["Takes floor space while unrolled", "Very thick mats can feel unstable for balance"],
    keyword: "yoga mat",
    price: 159,
    featured: true,
  },
  {
    name: "Gulf Trail Bottle",
    slug: "gulf-trail-bottle",
    category: "sports-outdoors",
    brand: "Fieldnote",
    shortDescription: "An insulated bottle demonstration for hot car parks and long walks.",
    description: "The Gulf Trail bottle stands in for everyday hydration gear. Insulation is the point in this climate. A basic bottle is fine if you refill often and do not leave it in a hot car.\n\nCapacity below is a sample figure.",
    images: [photo("photo-1602143407151-7111542de6e8")],
    features: ["Insulated wall in the sample brief", "One-handed lid", "Demonstration product"],
    specifications: [
      { label: "Sample capacity", value: "750 ml" },
      { label: "Use", value: "Daily carry" },
    ],
    pros: ["Relevant if you are outside between air-conditioned stops", "Simple to clean if the lid comes apart"],
    cons: ["Insulated bottles are bulkier", "Some lids are fiddly to wash"],
    keyword: "insulated water bottle",
    price: 79,
    trending: true,
    isNewArrival: true,
  },
  {
    name: "SoftStep Baby Monitor",
    slug: "softstep-baby-monitor",
    category: "baby-kids",
    brand: "CloudNest",
    shortDescription: "A monitor demonstration for parents who want a simple room check.",
    description: "SoftStep is sample nursery copy. A monitor is a convenience, not a safety device that replaces supervision. We do not claim medical or safety certification in this demo.\n\nRead the real manual before relying on any monitor.",
    images: [photo("photo-1555252333-9f8e92e65df9")],
    features: ["Room-to-room check in the sample brief", "Audio and video positioning", "Demonstration only"],
    specifications: [
      { label: "Type", value: "Baby monitor, sample" },
      { label: "Role", value: "Convenience, not a medical device" },
    ],
    pros: ["Useful when the nursery is down the hall", "A dedicated unit avoids using a phone all evening"],
    cons: ["Wi-Fi models depend on the home network", "Does not replace checking on a child"],
    keyword: "baby monitor",
    price: 499,
    featured: true,
    isDeal: true,
  },
  {
    name: "CloudNest Swaddle Set",
    slug: "cloudnest-swaddle",
    category: "baby-kids",
    brand: "CloudNest",
    shortDescription: "A soft swaddle set demonstration for the early months.",
    description: "CloudNest is sample baby textile copy. Fit, fabric, and sleep guidance should come from the product page and from your own paediatric advice, not from this preview.\n\nStock photography is used so we do not reuse retailer images.",
    images: [photo("photo-1519689680058-324335c77eba")],
    features: ["Soft textile sample", "Early-months positioning", "Demonstration set"],
    specifications: [
      { label: "Type", value: "Swaddle set" },
      { label: "Stage", value: "Sample: early months" },
    ],
    pros: ["A small, giftable textile", "Easy to understand as a category"],
    cons: ["Babies outgrow swaddles", "Fabric preferences differ"],
    keyword: "baby swaddle",
    price: 129,
    isNewArrival: true,
  },
  {
    name: "Quill Mechanical Keyboard",
    slug: "quill-mechanical-keyboard",
    category: "office-stationery",
    brand: "Deskline",
    shortDescription: "A compact keyboard demonstration for a shared or spare-room desk.",
    description: "Quill shows how XSelect would talk about a keyboard: size, noise, and whether mechanical switches belong in a quiet apartment.\n\nSwitch type below is a sample, not a measured review.",
    images: [photo("photo-1511467687858-23d96c32e4ae")],
    features: ["Compact layout", "Mechanical sample brief", "Desk-friendly size"],
    specifications: [
      { label: "Layout", value: "Compact, demonstration" },
      { label: "Best for", value: "Typing at a home desk" },
    ],
    pros: ["Clears space next to a notebook", "Satisfying if you type for long stretches"],
    cons: ["Clicky switches annoy people nearby", "A laptop keyboard is enough for light use"],
    keyword: "compact mechanical keyboard",
    price: 429,
    trending: true,
  },
  {
    name: "Deskline Monitor Lamp",
    slug: "deskline-monitor-lamp",
    category: "office-stationery",
    brand: "Deskline",
    shortDescription: "A screen-top lamp demonstration for evening work without a harsh overhead light.",
    description: "Deskline is a sample lighting pick for people who work after sunset. The useful question is whether a bar light reduces contrast strain compared with a ceiling spotlight.\n\nBrightness figures here are illustrative.",
    images: [photo("photo-1507473885765-e6ed057f782c")],
    features: ["Sits above a monitor in the sample setup", "Aimed at the desk, not the eyes", "Demonstration product"],
    specifications: [
      { label: "Mount", value: "Monitor or shelf, sample" },
      { label: "Use", value: "Evening desk work" },
    ],
    pros: ["Kinder than a single overhead bulb", "Frees the desktop"],
    cons: ["Will not fit every monitor thickness", "Unnecessary if the room is already evenly lit"],
    keyword: "monitor light bar",
    price: 219,
    isNewArrival: true,
    isDeal: true,
  },
  {
    name: "CarryLite Cabin Backpack",
    slug: "carrylite-cabin-backpack",
    category: "travel-essentials",
    brand: "Waymark",
    shortDescription: "A cabin backpack demonstration for weekend flights around the region.",
    description: "CarryLite is sample luggage copy. The practical test is whether it fits under a seat and whether the laptop sleeve is padded enough for your machine.\n\nAirline size limits change. Check the live dimensions before you travel.",
    images: [photo("photo-1553062407-98eeb64c6a62")],
    features: ["Cabin-oriented sample", "Laptop sleeve", "Front pocket for documents"],
    specifications: [
      { label: "Style", value: "Backpack" },
      { label: "Trip length", value: "Weekend, demonstration" },
    ],
    pros: ["Keeps your hands free in an airport", "Easier than a roller for short trips"],
    cons: ["A heavy pack is hard on the shoulders", "Not a substitute for checked luggage"],
    keyword: "cabin backpack",
    price: 359,
    featured: true,
    trending: true,
  },
  {
    name: "Oasis Packing Cubes",
    slug: "oasis-packing-cubes",
    category: "travel-essentials",
    brand: "Waymark",
    shortDescription: "Packing cubes for separating clothes on a short trip.",
    description: "Oasis cubes are a small travel demonstration. They help if you pack more than one outfit. They add little if you travel with a single change of clothes.\n\nSet contents in this entry are samples.",
    images: [photo("photo-1565026057447-bc90a3dceb87")],
    features: ["Separates outfits", "Compression is modest in the sample brief", "Demonstration set"],
    specifications: [
      { label: "Set", value: "Sample multi-size cubes" },
      { label: "Use", value: "Weekend packing" },
    ],
    pros: ["Makes a backpack easier to unpack", "Useful for laundry on the way home"],
    cons: ["Extra bulk if overfilled", "Unnecessary for a one-night trip"],
    keyword: "packing cubes",
    price: 99,
    isNewArrival: true,
  },
];

export const postSeed = [
  {
    title: "How to choose earbuds for a UAE commute",
    slug: "earbuds-for-a-uae-commute",
    excerpt: "Noise cancelling helps on the metro. It matters less if your day is mostly quiet rooms. Here is a practical way to decide.",
    coverImage: photo("photo-1590658268037-6bf12165a8df"),
    tags: ["audio", "commute"],
    content: `A commute in the Emirates can mean a quiet car, a busy metro, or a walk between very cold lobbies and very hot streets. Earbuds do not need to solve all three equally well.

## Start with the noise you actually hear

If most of your journey is a private car, active noise cancelling is a luxury. If you ride the metro or sit in an open office afterwards, it earns its place. Transparency modes matter when you still need to hear station announcements.

## Fit before features

A long feature list is useless if the earbuds fall out. Look for a set that includes more than one tip size, and read the return policy on Amazon before you commit. This guide does not score specific models.

## What we skip

We do not publish star ratings, invented review quotes, or "best seller" badges. Open the live Amazon.ae page for the current price, battery claims, and compatibility with your phone.

- Prefer a secure fit over a long specification table
- Check the case size against the bag you actually carry
- Confirm the return window on Amazon`,
  },
  {
    title: "A calmer kitchen: tools worth keeping",
    slug: "calmer-kitchen-tools",
    excerpt: "Most kitchens collect gadgets. A short list of pots and a decent kettle will outlast another single-use appliance.",
    coverImage: photo("photo-1556911220-e15b29be8c8f"),
    tags: ["kitchen", "home"],
    content: `Apartment kitchens in the UAE are often compact, and they share space with a lot of delivery containers. The useful question is what you will still reach for in six months.

## One heavy pot

A casserole that holds heat is worth more than three thin pans if you cook rice and stews. It is the wrong buy if you rarely cook or if you cannot lift it down from a high shelf.

## One kettle that matches how you drink

A gooseneck kettle is for pour-over coffee. A normal kettle is the better tool for tea and instant coffee. Buying both only makes sense if you truly use both.

## Leave room on the counter

If a gadget needs a manual you will not reread, it is a candidate to skip. XSelect would rather show fewer products than fill a page with things that look useful once.`,
  },
  {
    title: "Packing for a weekend in the Emirates",
    slug: "weekend-packing-emirates",
    excerpt: "A cabin bag, a bottle of water, and fewer outfits than you think. A simple packing note for short regional trips.",
    coverImage: photo("photo-1488646953014-85cb44e25828"),
    tags: ["travel"],
    content: `Weekend flights around the Gulf rarely need a checked bag. They do need a bag that fits the airline you are actually flying, and that limit is not the same on every carrier.

## Measure the bag, then the airline

Look up the current under-seat or cabin dimensions before you buy a backpack because a catalogue cannot keep every airline rule current. The CarryLite entry on this site is a demonstration, not a certified cabin size.

## Separate the outfits

Packing cubes help when you are taking more than one change of clothes. They are clutter if the trip is a single night.

## Sun and water

A hat, sunscreen, and a bottle you will actually refill beat another pair of shoes. Buy sunscreen from a listing that shows the ingredients, and reapply it. This site does not give medical advice.`,
  },
  {
    title: "A desk that fits an apartment",
    slug: "apartment-desk-setup",
    excerpt: "A keyboard and a lamp can improve a spare-room office without turning it into a studio.",
    coverImage: photo("photo-1497366216548-37526070297c"),
    tags: ["office", "apartment"],
    content: `Plenty of people in the UAE work from a corner of an apartment. The setup should pack down, stay quiet, and leave the room usable after hours.

## Noise is a household decision

A mechanical keyboard feels precise and can also be loud. If someone sleeps or takes calls nearby, choose a quieter switch or keep the laptop keyboard. We will not pretend one layout suits every home.

## Light the desk, not the ceiling

A monitor lamp or a small task lamp is often kinder at night than a bright ceiling light. Check that the mount fits your screen before you order.

## Buy the live specification

Dimensions, switch types, and brightness in demonstration products on XSelect are samples. The Amazon.ae page is the place to confirm what you will receive.`,
  },
];
