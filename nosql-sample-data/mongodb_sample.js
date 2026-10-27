function upsertById(collectionName, documents) {
  var operations = documents.map(function (document) {
    var fields = {};
    Object.keys(document).forEach(function (key) {
      if (key !== "_id") {
        fields[key] = document[key];
      }
    });
    return {
      updateOne: {
        filter: { _id: document._id },
        update: { $set: fields },
        upsert: true
      }
    };
  });

  if (operations.length > 0) {
    db.getCollection(collectionName).bulkWrite(operations);
  }
}

var branchIds = [
  "aaaaaaaa-0000-0000-0000-aaaaaaaa0001",
  "bbbbbbbb-0000-0000-0000-bbbbbbbb0002",
  "cccccccc-0000-0000-0000-cccccccc0003",
  "dddddddd-0000-0000-0000-dddddddd0004",
  "eeeeeeee-0000-0000-0000-eeeeeeee0005",
  "ffffffff-0000-0000-0000-ffffffff0006",
  "10101010-0000-0000-0000-101010100007",
  "11111111-0000-0000-0000-111111110008",
  "12121212-0000-0000-0000-121212120009",
  "13131313-0000-0000-0000-131313130010"
];

var officeIds = [
  "54141414-1414-1414-1414-141414141414",
  "55151515-1515-1515-1515-151515151515",
  "56161616-1616-1616-1616-161616161616",
  "57171717-1717-1717-1717-171717171717",
  "58181818-1818-1818-1818-181818181818",
  "59191919-1919-1919-1919-191919191919",
  "60606060-6060-6060-6060-606060606060",
  "61616161-6161-6161-6161-616161616161",
  "62626262-6262-6262-6262-626262626262",
  "63636363-6363-6363-6363-636363636363"
];

var officeNames = [
  "Private Room",
  "Open Desk",
  "Meeting Room",
  "Team Room",
  "Studio",
  "Flex Team",
  "Single Desk",
  "Collab Corner",
  "Creative Room",
  "Executive Suite"
];

var officePrices = [1200, 900, 1500, 2000, 1100, 1800, 800, 1300, 1700, 2400];
var officeCapacities = [4, 6, 8, 10, 5, 12, 3, 7, 9, 6];
var officeTables = [1, 3, 2, 4, 1, 5, 1, 2, 2, 1];
var officeCapacityPerTable = [1, 2, 1, 2, 1, 2, 1, 2, 1, 1];
var officePrivacy = [
  "PRIVATE",
  "SHARED",
  "PRIVATE",
  "SHARED",
  "PRIVATE",
  "SHARED",
  "PRIVATE",
  "SHARED",
  "PRIVATE",
  "PRIVATE"
];
var officeDescriptions = [
  "Quiet enclosed office for focused work",
  "Flexible hot desks in a shared area",
  "Meeting room with presentation equipment",
  "Large shared room for project teams",
  "Private studio with natural light",
  "Open team space with flexible seating",
  "Compact private workstation",
  "Shared collaboration area",
  "Private room for creative sessions",
  "Private executive workspace"
];

var cities = [
  ["Buenos Aires", "CABA", "Av. Corrientes 1001"],
  ["Buenos Aires", "CABA", "Guatemala 2002"],
  ["Buenos Aires", "CABA", "Av. Cabildo 3003"],
  ["Buenos Aires", "La Plata", "Calle 50 1004"],
  ["Santa Fe", "Rosario", "San Martín 5005"],
  ["Mendoza", "Mendoza", "San Juan 6006"],
  ["Córdoba", "Córdoba", "Av. Colón 7007"],
  ["Buenos Aires", "Mar del Plata", "Alvarado 8008"],
  ["Salta", "Salta", "Caseros 9009"],
  ["Tucumán", "San Miguel de Tucumán", "Avenida Mitre 1010"]
];

var branchNames = [
  "Downtown Office",
  "Palermo Workspace",
  "Belgrano Hub",
  "La Plata Business Center",
  "Rosario Innovation Hub",
  "Mendoza Coworking",
  "Córdoba Creative Office",
  "Mar del Plata Studio",
  "Salta Connect",
  "Tucumán Work Loft"
];

var branchPhones = [
  "+54 11 5555-1001",
  "+54 11 5555-1002",
  "+54 11 5555-1003",
  "+54 221 5555-1004",
  "+54 341 5555-1005",
  "+54 261 5555-1006",
  "+54 351 5555-1007",
  "+54 223 5555-1008",
  "+54 387 5555-1009",
  "+54 381 5555-1010"
];

var officeFrontImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDQiPjxwYXRoIGZpbGw9IiM3ODkiIGQ9Ik0uNSAyIDMgLjUgNS41IDJ2MmgtNXoiLz48cGF0aCBmaWxsPSIjZGVmIiBkPSJNMSAyLjVoMXYxSDFtMi0xaDF2MUgzIi8+PC9zdmc+";
var officeInteriorImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDQiPjxwYXRoIGZpbGw9IiNkZWYiIGQ9Ik0uNS41aDV2M2gtNXoiLz48cGF0aCBmaWxsPSIjNzg5IiBkPSJNMSAyaDR2LjVIMXptLjUuNWguNXYxaC0uNW0yIDBWMi41aC41djEiLz48L3N2Zz4=";

var branches = branchIds.map(function (branchId, index) {
  var location = cities[index];
  return {
    _id: branchId,
    name: branchNames[index],
    phone: branchPhones[index],
    province: location[0],
    city: location[1],
    street: location[2],
    offices: [{
      id: officeIds[index],
      name: officeNames[index],
      price: officePrices[index],
      capacity: officeCapacities[index],
      tablesQuantity: officeTables[index],
      capacityPerTable: officeCapacityPerTable[index],
      privacy: officePrivacy[index]
    }],
    images: [officeFrontImage, officeInteriorImage]
  };
});

upsertById("office_branches", branches);

var renterEmails = [
  "alice@example.com",
  "bob@example.com",
  "carla@example.com",
  "dario@example.com",
  "eva@example.com",
  "fabio@example.com",
  "gina@example.com",
  "hugo@example.com",
  "ines@example.com",
  "julian@example.com"
];

upsertById("news__office_branches", branchIds.map(function (branchId, index) {
  return {
    _id: branchId,
    lastRenterEmails: [
      renterEmails[index],
      renterEmails[(index + 1) % renterEmails.length],
      "visitor" + (index + 1) + "@example.com"
    ]
  };
}));

var newsStatuses = ["SENT", "DRAFT", "SENT", "DELETED", "SENT", "DRAFT", "SENT", "SENT", "DELETED", "DRAFT"];
var newsSubjects = [
  "New meeting rooms",
  "November community events",
  "Extended reception hours",
  "September maintenance notice",
  "Member referral program",
  "Holiday opening schedule",
  "New coffee service",
  "Workspace improvements",
  "August parking update",
  "Local business networking"
];

upsertById("news", branchIds.map(function (branchId, index) {
  var sent = newsStatuses[index] === "SENT";
  return {
    _id: "news-" + ("00" + (index + 1)).slice(-3),
    officeBranchId: branchId,
    subject: newsSubjects[index],
    title: newsSubjects[index],
    body: "Hello from " + branchNames[index] + ". Visit the reception desk for details.",
    created: ISODate("2026-10-" + ("0" + (index + 1)).slice(-2) + "T00:00:00Z"),
    recipients: sent ? [renterEmails[index], renterEmails[(index + 1) % renterEmails.length]] : [],
    status: newsStatuses[index],
    sentAt: sent ? ISODate("2026-10-" + ("0" + (index + 2)).slice(-2) + "T12:00:00Z") : null
  };
}));

var reviewRatings = [[5, 5], [4, 5], [3, 4], [2, 5], [1, 3], [5, 4], [2, 2], [3, 5], [4, 4], [1, 5]];
var reviewComments = [
  ["Excellent service and a quiet space.", "The room was bright and well equipped."],
  ["Convenient location and friendly staff.", "Great value for a full day of work."],
  ["Good meeting room for a small team.", "Reliable Wi-Fi and easy check-in."],
  ["Plenty of room for our workshop.", "Clean space, though a little noisy."],
  ["The studio was comfortable.", "Helpful team and fast internet."],
  ["Flexible seating worked well for us.", "Would book again for a team day."],
  ["A practical space for focused work.", "Simple check-in and a good desk."],
  ["Nice place to collaborate.", "The staff helped us get set up quickly."],
  ["Great natural light and a calm room.", "Well maintained and easy to find."],
  ["Private, comfortable, and professional.", "The reception team was very helpful."]
];

var reviews = [];
var officeStats = [];
for (var index = 0; index < officeIds.length; index += 1) {
  var ratings = reviewRatings[index];
  reviews.push({
    _id: "review-" + ("00" + (index * 2 + 1)).slice(-3),
    comment: reviewComments[index][0],
    stars: ratings[0],
    officeBranchId: branchIds[index],
    officeId: officeIds[index],
    renterEmail: renterEmails[index],
    created: ISODate("2026-10-" + ("0" + (index + 1)).slice(-2) + "T15:00:00Z")
  });
  reviews.push({
    _id: "review-" + ("00" + (index * 2 + 2)).slice(-3),
    comment: reviewComments[index][1],
    stars: ratings[1],
    officeBranchId: branchIds[index],
    officeId: officeIds[index],
    renterEmail: renterEmails[(index + 2) % renterEmails.length],
    created: ISODate("2026-10-" + ("0" + (index + 2)).slice(-2) + "T15:00:00Z")
  });
  officeStats.push({
    _id: officeIds[index],
    officeBranchId: branchIds[index],
    totalStars: ratings[0] + ratings[1],
    totalVotes: 2
  });
}

upsertById("reviews", reviews);
upsertById("office", officeStats);

var bookingDates = [
  ["2026-07-01", "JULY"],
  ["2026-07-02", "JULY"],
  ["2026-07-03", "JULY"],
  ["2026-07-04", "JULY"],
  ["2026-07-05", "JULY"],
  ["2026-07-06", "JULY"],
  ["2026-07-07", "JULY"],
  ["2026-07-08", "JULY"],
  ["2026-07-09", "JULY"],
  ["2026-07-10", "JULY"]
];
var bookingIds = [
  "94141414-1414-1414-1414-141414141414",
  "95151515-1515-1515-1515-151515151515",
  "96161616-1616-1616-1616-161616161616",
  "97171717-1717-1717-1717-171717171717",
  "98181818-1818-1818-1818-181818181818",
  "99191919-1919-1919-1919-191919191919",
  "10001000-1000-1000-1000-100010001000",
  "10011001-1001-1001-1001-100110011001",
  "10021002-1002-1002-1002-100210021002",
  "10031003-1003-1003-1003-100310031003"
];
var bookingAmounts = [1500, 1800, 2100, 1250, 980, 1650, 1100, 1400, 2200, 1950];

upsertById("bookings", bookingIds.map(function (bookingId, index) {
  return {
    _id: bookingId,
    officeBranchId: branchIds[index],
    officeId: officeIds[index],
    amount: bookingAmounts[index],
    paymentDate: ISODate(bookingDates[index][0] + "T00:00:00Z"),
    month: bookingDates[index][1],
    year: 2026
  };
}));

print("Seeded 10 branches, 10 offices, 20 reviews, 10 news items, and 10 report bookings.");
