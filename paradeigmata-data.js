const exampleCars = {
  "clio": {
    "name": "Renault Clio",
    "body": "Hatchback πόλης",
    "age": 3,
    "depreciation": 0.4,
    "km": 45000,
    "editions": [
      {
        "key": "tce90",
        "name": "Evolution TCe 90",
        "fuel": "Βενζίνη · 90 PS",
        "price": 1501412,
        "co2": 118,
        "image": "renault-clio-v-2023-standard",
        "extras": [
          {
            "key": "camera",
            "label": "Κάμερα οπισθοπορίας",
            "price": 19000,
            "group": "Στάθμευση"
          },
          {
            "key": "comfort",
            "label": "Pack Comfort · κάρτα hands-free και αναδιπλούμενοι καθρέπτες",
            "price": 16000
          },
          {
            "key": "floor",
            "label": "Αποσπώμενο πάτωμα χώρου αποσκευών",
            "price": 7500
          },
          {
            "key": "nav",
            "label": "Easy Link 7″ με πλοήγηση",
            "price": 36000,
            "group": "Πλοήγηση"
          },
          {
            "key": "wheels",
            "label": "Pack Look · ζάντες 16″ και φιμέ τζάμια",
            "price": 35000,
            "group": "Τροχοί"
          },
          {
            "key": "allseason",
            "label": "Ελαστικά τεσσάρων εποχών",
            "price": 15500,
            "group": "Τροχοί"
          },
          {
            "key": "rafale",
            "label": "Γκρι Rafale",
            "price": 45800,
            "group": "Χρώμα"
          },
          {
            "key": "flame",
            "label": "Κόκκινο Flame",
            "price": 31300,
            "group": "Χρώμα"
          }
        ],
        "hybrid": false
      },
      {
        "key": "lpg",
        "name": "Techno TCe 100 LPG",
        "fuel": "Βενζίνη / LPG · 100 PS",
        "price": 1635911,
        "co2": 109,
        "image": "renault-clio-techno",
        "extras": [
          {
            "key": "camera",
            "label": "Κάμερα οπισθοπορίας",
            "price": 19000,
            "group": "Στάθμευση"
          },
          {
            "key": "city",
            "label": "Pack City · κάμερα 360°",
            "price": 48000,
            "group": "Στάθμευση"
          },
          {
            "key": "floor",
            "label": "Αποσπώμενο πάτωμα χώρου αποσκευών",
            "price": 7500
          },
          {
            "key": "nav",
            "label": "Easy Link 7″ με πλοήγηση",
            "price": 36000,
            "group": "Πλοήγηση"
          },
          {
            "key": "nav93",
            "label": "Pack Navigation 9,3″",
            "price": 45000,
            "group": "Πλοήγηση"
          },
          {
            "key": "wheels17",
            "label": "Pack Look · ζάντες 17″",
            "price": 39000,
            "group": "Τροχοί"
          },
          {
            "key": "rafale",
            "label": "Γκρι Rafale",
            "price": 45800,
            "group": "Χρώμα"
          },
          {
            "key": "flame",
            "label": "Κόκκινο Flame",
            "price": 31300,
            "group": "Χρώμα"
          }
        ],
        "hybrid": false
      },
      {
        "key": "hybrid",
        "name": "Esprit Alpine E-Tech 145",
        "fuel": "Full hybrid · 145 PS",
        "price": 2111323,
        "co2": 98,
        "image": "renault-clio-v-2023-alpine",
        "extras": [
          {
            "key": "camera",
            "label": "Κάμερα οπισθοπορίας",
            "price": 19000,
            "group": "Στάθμευση"
          },
          {
            "key": "city",
            "label": "Pack City · κάμερα 360°",
            "price": 48000,
            "group": "Στάθμευση"
          },
          {
            "key": "citypremium",
            "label": "Pack City Premium · αυτόματο παρκάρισμα",
            "price": 43500,
            "group": "Στάθμευση"
          },
          {
            "key": "safety",
            "label": "Pack Safety & Driving",
            "price": 55000
          },
          {
            "key": "comfort",
            "label": "Pack Comfort · κάρτα hands-free και αναδιπλούμενοι καθρέπτες",
            "price": 16000
          },
          {
            "key": "nav",
            "label": "Easy Link 7″ με πλοήγηση",
            "price": 36000,
            "group": "Πλοήγηση"
          },
          {
            "key": "rafale",
            "label": "Γκρι Rafale",
            "price": 45800,
            "group": "Χρώμα"
          },
          {
            "key": "flame",
            "label": "Κόκκινο Flame",
            "price": 31300,
            "group": "Χρώμα"
          }
        ],
        "hybrid": true
      }
    ]
  },
  "911": {
    "name": "Porsche 911",
    "body": "Σπορ coupé",
    "age": 3,
    "depreciation": 0.35,
    "km": 45000,
    "editions": [
      {
        "key": "carrera",
        "name": "Carrera",
        "fuel": "3.0 biturbo · 385 PS",
        "price": 9659400,
        "co2": 245,
        "image": "porsche-911-carrera-coupe",
        "extras": [
          {
            "key": "lift",
            "label": "Ανύψωση εμπρός άξονα",
            "price": 228800
          },
          {
            "key": "bose",
            "label": "Ηχοσύστημα BOSE",
            "price": 134100,
            "group": "Ήχος"
          },
          {
            "key": "burmester",
            "label": "Ηχοσύστημα Burmester",
            "price": 436100,
            "group": "Ήχος"
          },
          {
            "key": "glass",
            "label": "Γυάλινη ηλιοροφή",
            "price": 212900,
            "group": "Οροφή"
          },
          {
            "key": "carbon",
            "label": "Οροφή carbon",
            "price": 337000,
            "group": "Οροφή"
          },
          {
            "key": "heated",
            "label": "Θερμαινόμενα εμπρός καθίσματα",
            "price": 46200
          },
          {
            "key": "black",
            "label": "Μεταλλικό Jet Black",
            "price": 117200,
            "group": "Χρώμα"
          },
          {
            "key": "surround",
            "label": "ParkAssist με τέσσερις κάμερες",
            "price": 160000,
            "group": "Στάθμευση"
          }
        ],
        "hybrid": false
      },
      {
        "key": "gts",
        "name": "Carrera GTS",
        "fuel": "3.0 biturbo · 480 PS",
        "price": 12439200,
        "co2": 258,
        "image": "porsche-911-gts-coupe",
        "extras": [
          {
            "key": "lift",
            "label": "Ανύψωση εμπρός άξονα",
            "price": 228800
          },
          {
            "key": "bose",
            "label": "Ηχοσύστημα BOSE",
            "price": 134100,
            "group": "Ήχος"
          },
          {
            "key": "burmester",
            "label": "Ηχοσύστημα Burmester",
            "price": 436100,
            "group": "Ήχος"
          },
          {
            "key": "glass",
            "label": "Γυάλινη ηλιοροφή",
            "price": 212900,
            "group": "Οροφή"
          },
          {
            "key": "carbon",
            "label": "Οροφή carbon",
            "price": 337000,
            "group": "Οροφή"
          },
          {
            "key": "heated",
            "label": "Θερμαινόμενα εμπρός καθίσματα",
            "price": 46200
          },
          {
            "key": "black",
            "label": "Μεταλλικό Jet Black",
            "price": 117200,
            "group": "Χρώμα"
          },
          {
            "key": "surround",
            "label": "ParkAssist με τέσσερις κάμερες",
            "price": 160000,
            "group": "Στάθμευση"
          }
        ],
        "hybrid": false
      },
      {
        "key": "gt3",
        "name": "GT3",
        "fuel": "4.0 ατμοσφαιρικός · 510 PS",
        "price": 15655500,
        "co2": 293,
        "image": "porsche-911-gt3-coupe",
        "extras": [
          {
            "key": "lift",
            "label": "Ανύψωση εμπρός άξονα",
            "price": 296400
          },
          {
            "key": "bose",
            "label": "Ηχοσύστημα BOSE",
            "price": 134100,
            "group": "Ήχος"
          },
          {
            "key": "carbon",
            "label": "Οροφή carbon",
            "price": 337000,
            "group": "Οροφή"
          },
          {
            "key": "heated",
            "label": "Θερμαινόμενα εμπρός καθίσματα",
            "price": 46200
          },
          {
            "key": "black",
            "label": "Μεταλλικό Jet Black",
            "price": 117200,
            "group": "Χρώμα"
          },
          {
            "key": "camera",
            "label": "Πίσω κάμερα με ParkAssist",
            "price": 117200
          },
          {
            "key": "blue",
            "label": "Ειδικό χρώμα Shark Blue",
            "price": 338100,
            "group": "Χρώμα"
          }
        ],
        "hybrid": false
      },
      {
        "key": "turbo",
        "name": "Turbo",
        "fuel": "3.8 biturbo · 580 PS",
        "price": 16812500,
        "co2": 279,
        "image": "porsche-911-turbo-coupe",
        "extras": [
          {
            "key": "lift",
            "label": "Ανύψωση εμπρός άξονα",
            "price": 228800
          },
          {
            "key": "burmester",
            "label": "Ηχοσύστημα Burmester",
            "price": 302000
          },
          {
            "key": "glass",
            "label": "Γυάλινη ηλιοροφή",
            "price": 212900,
            "group": "Οροφή"
          },
          {
            "key": "carbon",
            "label": "Οροφή carbon",
            "price": 337000,
            "group": "Οροφή"
          },
          {
            "key": "surround",
            "label": "ParkAssist με τέσσερις κάμερες",
            "price": 98000
          },
          {
            "key": "leather",
            "label": "Δερμάτινο σαλόνι Exclusive Manufaktur",
            "price": 933700
          }
        ],
        "hybrid": false
      }
    ]
  }
};
