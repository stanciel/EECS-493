function show(elementID) {
  var element = document.getElementById(elementID);
  if (!element) {
      alert("no such element");
      return;
  }
  var pages = document.getElementsByClassName('page');
  for(var i = 0; i < pages.length; i++) {
      pages[i].style.display = 'none';
  }
  
  element.style.display = 'block';
}

$(document).ready(function () {
        //old vue code 
        $('.signin').hide()
    var eventsVue = new Vue({
        el: "#events",
        data() {
            return {
              //events
              eventsList: [],
              numEvents: 0,
              search: '',
              sortDate: false,
              sortDuration: false,
              sortPrice: false,
              totalEventsList: [],
            }
          },
          methods: {
              searchEvents:function() {
                if(this.search){
                  temp = JSON.parse(JSON.stringify(this.totalEventsList));
                  tempList = temp.filter(guide => {
                    return guide.name.toLowerCase().includes(this.search.toLowerCase())
                      || this.search.toLowerCase().includes(guide.name.toLowerCase())
                      || guide.type.includes(this.search.toLowerCase())
                      || this.search.toLowerCase().includes(guide.type)
                  })
                  this.eventsList = tempList
                  this.numEvents = this.eventsList.length; 
                }
              },

              //ONLY CALL CALCULATE CALORIES IF USER WEIGHT IS NOT NULL
              calculateCalories: function() { 
                var MET = [{name: "Cycling", num: 6.8}, {name: "Walking", num: 4.3}, {name: "Running", num: 9.8}, {name: "Zumba", num: 7.3}, {name: "Kickboxing", num: 7.5},
                {name: "Hiit", num: 8}, {name: "Yoga", num: 2.5}, {name: "Cardio", num: 7.5}, {name: "Strength", num: 5}, {name: "Pilates", num: 3.8}]
                this.eventsList.forEach(element => {
                  element.type.forEach(typeElement => {
                    //search in calorie array for the type
                    let currentMET = MET.find(o => o.name === typeElement).num; 
                    let curWeight = user.weight * 0.453592;
                    let currentCal = ((3.5 * currentMET * curWeight)/200) * element.duration; 
                    element.calories.push(currentCal); 
                  })
                })
              },
              calculateDistance: function() {
              },
              //Filters
              sortEvents: function(type) {
                  //sortDate
                  if (type == 1) {
                      this.sortDate = true;
                      this.sortDuration = false;
                      this.sortPrice = false;
                      this.eventsList.sort(function(a,b) {
                          let dateA = a.date;
                          let dateB = b.date;
                          if (dateA.getTime() < dateB.getTime()) {
                              return -1;
                          }
                          else if (datA.getTime() > dateB.getTime()) {
                              return 1;
                          }
                          return 0;
                      })
                  }
                  //sortDuration
                  else if (type == 2) {
                      this.sortDuration = true;
                      this.sortDate = false;
                      this.sortPrice = false;
                    this.eventsList.sort(function(a,b) {
                        let durationA = a.duration;
                        let durationB = b.duration;
                        if (durationA < durationB) {
                            return -1;
                        }
                        else if (durationA > durationB) {
                            return 1;
                        }
                        //duration is the same
                        return 0;
                    })
                  }
                  //sortPrice
                  else if (type == 3) {
                      this.sortPrice = true;
                      this.sortDuration = false;
                      this.sortDate = false;
                      this.eventsList.sort(function(a,b) {
                        let priceA = a.price;
                        let priceB = b.price;
                        if (priceA < priceB) {
                            return -1;
                        }
                        else if (priceA > priceB) {
                            return 1;
                        }
                        //price is the same
                        return 0;
                    })
                  }
                //sort based 
                  
              },
              addEvents: function() {
                  //add more events
                  //recurrs mon-Fri
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 12, 1, 7, 15),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, length: 0, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 12, 1, 8, 30),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, length: 0, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 11, 30, 4),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, length: 0, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 11, 30, 5, 15),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, length: 0, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 11, 30, 6, 30),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, length: 0, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                //recurrs Sat-Sun
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 12, 4, 8),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, length: 0, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 12, 4, 9, 15),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, length: 0, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 12, 4, 10, 30),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, length: 0, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                //   //update numEvents
                //   //IM 
                  this.eventsList.push({name:"Metabolic Circuit", type: ["Strength", "Cardio"], date: new Date(2021, 12, 6, 12),location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 12, 6, 4, 30),location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Tabata", type: ["Hiit"], date: new Date(2021, 12, 6, 4, 45),location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cardio Kickboxing", type: ["Kickboxing"], date: new Date(2021, 12, 6, 5),location:"NCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 12, 6, 5, 15),location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 12, 6, 5, 30),location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 12, 6, 5, 45),location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Total Body Strength", type: ["Strength"], date: new Date(2021, 12, 6, 6),location:"NCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Restorative Flow", type: ["Yoga", "Stretch"], date: new Date(2021, 12, 6, 7),location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Slow Flow", type: ["Yoga"], date: new Date(2021, 12, 6, 7, 15),location:"NCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Strength & Sculpt", type: ["Cardio", "Hiit", "Strength"], date: new Date(2021, 12, 6, 7, 15),location:"IMSB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});      
                  //Tuesday
                  this.eventsList.push({name:"Barre Above", type: ["Strength", "Cardio"], date: new Date(2021, 11, 30, 7, 30),location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 11, 30, 4, 15),location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Total Body Strength", type: ["Strength"], date: new Date(2021, 11, 30, 5),location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Pilates", type: ["Pilates"], date: new Date(2021, 11, 30, 5, 15),location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Power Flow", type: ["Yoga"], date: new Date(2021, 11, 30, 5, 15),location:"IMSB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Restorative Flow", type: ["Yoga", "Stretch"], date: new Date(2021, 11, 30, 5, 30),location:"NCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 11, 30, 6),location:"IMSB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 11, 30, 6, 15),location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Power Flow", type: ["Yoga"], date: new Date(2021, 11, 30, 7),location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Slow Flow", type: ["Yoga"], date: new Date(2021, 11, 30, 7, 30),location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});

                  //Trails/Parks
                  this.eventsList.push({name:"Bird Hills Trail", type: ["Walking, Running, Jogging"], date: null,location:"1850 Newport Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: null, length: 4.16, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Black Pond Woods", type: ["Walking, Running, Jogging"], date: null,location:" 1905 Traver Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: null, length: 1.12, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Mary Beth Doyle", type: ["Walking, Running, Jogging"], date: null,location:"3500 Birch Hollow Drive", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: null, length: 1.24, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Furstenberg", type: ["Walking, Running, Jogging"], date: null,location:"2626 Fuller Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: null, length: 1.74, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Marshall", type: ["Walking, Running, Jogging"], date: null,location:"Corner of Plymouth and Dixboro Roads", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: null, length: 3.26, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Cedar Bend", type: ["Walking, Running, Jogging"], date: null,location:"1495 Cedar Bend Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: null, length: 1.21, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});

                  this.eventsList.push({name:"The Arb", type: ["Walking, Running, Jogging"], date: null,location:"1610 Washington Heights", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: null, length: 0, signup: "https://mbgna.umich.edu/wp-content/uploads/2018/02/02-Trail-Overview.pdf"});

                  this.eventsList.push({name:"Fuller Park", type: ["Walking, Running, Jogging"], date: null,location:"1519 Fuller Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: null, length: 0, signup: "https://www.a2gov.org/departments/Parks-Recreation/parks-places/PublishingImages/Pages/Fuller/FullerLocationMap.png"});
                  this.numEvents = this.eventsList.length;
                  this.totalEventsList = JSON.parse(JSON.stringify(this.eventsList));
          }
      }
    });
    
    eventsVue.addEvents();
    
    //new java script code
    //TODO: save users array info even after page has reloaded
    var users = [];
    var user = new Vue({
        el: "#users",
        data() {
            return{
                email: '',
                password: '',
                reentered: '',
                address: '',
                age: undefined,
                gender: ' ',
                zipcode: '',
                height: undefined,
                weight: undefined,
                firstname: '',
                lastname: '',
            }
        },
        methods: {
            //add functions specific to one user
        }
    });
    $('.login').click(function() {
        $('.signup').hide()
        $('.signin').show()
    });

    $('.createaccount').click(function() {
        if(user.email === '' || user.password === '' || user.zipcode === '' || user.firstname === '' || 
            user.lastname === '') {
            alert("Required fields have not been filled out");
        }
        else if(user.password != user.reentered) {
            alert("Passwords do not match");
        }
        else {
            users.push(user);
            //UNCOMMENT WHEN DONE CODING
            // $( "#users" ).toggle();
            // $( "#events" ).toggle();
        }
        $( "#users" ).toggle();
        $( "#events" ).toggle();
        //test
    })

});
