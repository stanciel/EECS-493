function showPage(elementID) {
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
  //ADD THIS
  $('.signin').hide()
  
  //Date picker for create event
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
   dd = '0' + dd;
  }

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("eventDate").setAttribute("min", today);

    var bigVue = new Vue({
        el: "#app",
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
              types: '',
              cal: '',
              newEvent: {
                name: '',
                type: [''], 
                date: new Date(),
                location: '', 
                distance: undefined,
                price: null,
                openSpots: null,
                peopleAttending: null,
                reccuring: undefined,
                calories: [],
                duration: undefined,
                length: undefined, 
                signup: '',
              },
              newUser: {
                  email: '',
                  password: '',
                  address: '',
                  age: undefined,
                  gender: ' ',
                  zipcode: '',
                  height: undefined,
                  weight: undefined,
                  firstname: '',
                  lastname: '',
                  savedEvents: []
                },
              weekday: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            }
          },
          methods: {
              signupParse:function(){
                  if(this.newUser.email === '' || this.newUser.password === '' || this.newUser.gender === '' || this.newUser.zipcode === '' || this.newUser.firstname === '' || 
                  this.newUser.lastname === '' || this.newUser.age === undefined || this.newUser.height === undefined || this.newUser.weight === undefined) {
                    console.log(JSON.stringify(this.newUser.email))
                    console.log(JSON.stringify(this.newUser.firstname))
                  alert("Required fields have not been filled out")
                }
                else {
                  showPage('events');
                }
            },
              logIn:function(){
                this.newUser.email = "admin@gmail.com";
                this.newUser.password = "password";
                this.newUser.address = "2260 Hayward St, Ann Arbor, MI";
                this.newUser.zipcode = "48109";
                this.newUser.age = 21;
                this.newUser.height = 64;
                this.newUser.weight = 128;
                this.newUser.firstname = "Rhea";
                this.newUser.lastname = "Bhakhri";
                showPage('events');
                console.log("signup has been hidden")
          },
              searchEvents:function() {
                if(this.search){
                  temp = JSON.parse(JSON.stringify(this.totalEventsList));
                  
                  tempList = temp.filter(guide => {
                    const types = guide.type.map(name => name.toLowerCase());
                    inTypes = false
                    typeWithin = false
                    types.forEach(type => {
                      if(type.includes(this.search.toLowerCase()) === true){
                        inTypes = true
                      }
                      if(this.search.toLowerCase().includes(type) === true){
                        typeWithin = true
                      }
                    })

                    return guide.name.toLowerCase().includes(this.search.toLowerCase())
                      || this.search.toLowerCase().includes(guide.name.toLowerCase())
                      || types.includes(this.search.toLowerCase())
                      || inTypes === true
                      || typeWithin === true
                      || this.search.includes(guide.duration)
                  })
                  tempList.forEach(event => event.date = new Date(event.date))
                  this.eventsList = tempList
                  this.numEvents = this.eventsList.length; 
                  bigVue.calculateCalories();
                }
              },

              resetEvents:function() {
                this.eventsList = this.totalEventsList;
                this.numEvents = this.eventsList.length; 
              },
              

              calculateCalories: function() { 
                var MET = [{name: "Cycling", num: 6.8}, {name: "Walking", num: 4.3}, {name: "Running", num: 9.8}, {name: "Zumba", num: 7.3}, {name: "Kickboxing", num: 7.5},
                {name: "Hiit", num: 8}, {name: "Yoga", num: 2.5}, {name: "Cardio", num: 7.5}, {name: "Strength", num: 5}, {name: "Pilates", num: 3.8},{name: "Jogging", num: 8} ]

                this.eventsList.forEach(element => {
                  element.type.forEach(typeElement => {
                    //search in calorie array for the type
                    if (MET.find(o => o.name === typeElement) != undefined) {
                    let currentMET = MET.find(o => o.name === typeElement).num; 
                    let curWeight = this.newUser.weight * 0.453592;
                    let currentCal = Math.round(((3.5 * currentMET * curWeight)/200) * element.duration); 
                    element.calories.push(currentCal); 
                    }
                  })
                })
              },
              saveEvent: function(eventIndex) {
                //Add event to user profile - how to access specific user? 
                if(this.newUser.savedEvents){
                  this.newUser.savedEvents.push(this.eventsList[eventIndex]);
                }
                else{
                  this.newUser.savedEvents = [this.eventsList[eventIndex]];
                }
                alert("Your event has been saved!");
              },
              removeSavedEvent: function(index) {
                if(this.newUser.savedEvents){
                  this.newUser.savedEvents.splice(this.newUser.savedEvents.indexOf(index), 1);
                }
                alert("Your event has been removed!");
              },
              //Filters
              sortEvents: function(type) {
                  if (type === 1) {
                      this.sortDate = true;
                      this.sortDuration = false;
                      this.sortPrice = false;
                      this.eventsList.sort(function(a,b) {
                          let dateA = new Date(a.date);
                          let dateB = new Date(b.date);
                          if (dateA.getTime() < dateB.getTime()) {
                              return -1;
                          }
                          else if (dateA.getTime() > dateB.getTime()) {
                              return 1;
                          }
                          return 0;
                      })
                  }
                  // //sortDuration
                  else if (type === 2) {
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
                  else if (type === 3) {
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
                  //recurrs mon-Fri
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 11, 1, 7, 15),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: 18, openSpots: null, peopleAttending: null, reccuring: 5, calories: [], duration: 60, length: 0, signup: "https://www.mvmntfit.com/"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 11, 1, 8, 30),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: 18, openSpots: null, peopleAttending: null, reccuring: 5, calories: [], duration: 60, length: 0, signup: "https://www.mvmntfit.com/"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 10, 30, 4),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: 18, openSpots: null, peopleAttending: null, reccuring: 5, calories: [], duration: 60, length: 0, signup: "https://www.mvmntfit.com/"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 10, 30, 5, 15),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: 18, openSpots: null, peopleAttending: null, reccuring: 5, calories: [], duration: 60, length: 0, signup: "https://www.mvmntfit.com/"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 10, 30, 6, 30),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: 18, openSpots: null, peopleAttending: null, reccuring: 5, calories: [], duration: 60, length: 0, signup: "https://www.mvmntfit.com/"});
                //recurrs Sat-Sun
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 11, 4, 8),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: 18, openSpots: null, peopleAttending: null, reccuring: 2, calories: [], duration: 60, length: 0, signup: "https://www.mvmntfit.com/"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 11, 4, 9, 15),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: 18, openSpots: null, peopleAttending: null, reccuring: 2, calories: [], duration: 60, length: 0, signup: "https://www.mvmntfit.com/"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["Cycling"], date: new Date(2021, 11, 4, 10, 30),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: 18, openSpots: null, peopleAttending: null, reccuring: 2, calories: [], duration: 60, length: 0, signup: "https://www.mvmntfit.com/"});
                //   //update numEvents
                // Monday
                  this.eventsList.push({name:"Metabolic Circuit", type: ["Strength", "Cardio"], date: new Date(2021, 11, 6, 12),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 11, 6, 4, 30),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Tabata", type: ["Hiit"], date: new Date(2021, 11, 6, 4, 45),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cardio Kickboxing", type: ["Kickboxing"], date: new Date(2021, 11, 6, 5),location:"NCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 11, 6, 5, 15),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 11, 6, 5, 30),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 11, 6, 5, 45),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Total Body Strength", type: ["Strength"], date: new Date(2021, 11, 6, 6),location:"NCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Restorative Flow", type: ["Yoga", "Stretch"], date: new Date(2021, 11, 6, 7),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Slow Flow", type: ["Yoga"], date: new Date(2021, 11, 6, 7, 15),location:"NCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Strength & Sculpt", type: ["Cardio", "Hiit", "Strength"], date: new Date(2021, 11, 6, 7, 15),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});      
                  //Tuesday
                  this.eventsList.push({name:"Barre Above", type: ["Strength", "Cardio"], date: new Date(2021, 10, 30, 7, 30),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 10, 30, 4, 15),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Total Body Strength", type: ["Strength"], date: new Date(2021, 10, 30, 5),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Pilates", type: ["Pilates"], date: new Date(2021, 10, 30, 5, 15),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Power Flow", type: ["Yoga"], date: new Date(2021, 10, 30, 5, 15),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Restorative Flow", type: ["Yoga", "Stretch"], date: new Date(2021, 10, 30, 5, 30),location:"NCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 10, 30, 6),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 10, 30, 6, 15),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Power Flow", type: ["Yoga"], date: new Date(2021, 10, 30, 7),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Slow Flow", type: ["Yoga"], date: new Date(2021, 10, 30, 7, 30),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  //Wednesday
                  this.eventsList.push({name:"Barre Above", type: ["Strength", "Cardio"], date: new Date(2021, 11, 1, 11),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Metabolic Circuit", type: ["Strength", "Cardio"], date: new Date(2021, 11, 1, 4, 30),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cardio Core", type: ["Cardio"], date: new Date(2021, 11, 1, 4, 45),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 11, 1, 5, 30),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Zumba", type: ["Zumba"], date: new Date(2021, 11, 1, 5, 45),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 11, 1, 6),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Power Flow", type: ["Yoga"], date: new Date(2021, 11, 1, 6),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Strength & Sculpt", type: ["Cardio", "Hiit", "Strength"], date: new Date(2021, 11, 1, 7, 15),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"}); 
                  this.eventsList.push({name:"Slow Flow", type: ["Yoga"], date: new Date(2021, 11, 1, 8, 15),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});

                  //Thursday
                  this.eventsList.push({name:"Barre Above", type: ["Strength", "Cardio"], date: new Date(2021, 11, 2, 7, 39),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Restorative Flow", type: ["Yoga", "Stretch"], date: new Date(2021, 11, 2, 12, 30),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Tabata", type: ["Hiit"], date: new Date(2021, 11, 2, 4, 45),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 11, 2, 5),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Power Flow", type: ["Yoga"], date: new Date(2021, 11, 2, 7, 30),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});

                  //Friday
                  this.eventsList.push({name:"Cardio Core", type: ["Cardio"], date: new Date(2021, 11, 3, 11, 45),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Slow Flow", type: ["Yoga"], date: new Date(2021, 11, 3, 1),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Total Body Strength", type: ["Strength"], date: new Date(2021, 11, 3, 2),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Cycle", type: ["Cycling"], date: new Date(2021, 11, 3, 63),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Barre Above", type: ["Strength", "Cardio"], date: new Date(2021, 11, 3, 4, 45),location:"IMSB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Nike Training Club", type: ["Strength", "Cardio"], date: new Date(2021, 11, 3, 5, 15),location:"Virtual(Zoom)", distance:0, price: 5, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});
                  this.eventsList.push({name:"Restorative Flow", type: ["Yoga", "Stretch"], date: new Date(2021, 11, 3, 5, 45),location:"CCRB", distance:0, price: 8, openSpots: null, peopleAttending: null, reccuring: 1, calories: [], duration: 50, length: 0, signup: "https://recsports.umich.edu/groupx/schedule/"});

                  //Trails/Parks
                  this.eventsList.push({name:"Bird Hills Trail", type: ["Walking", "Running", "Jogging"], date: null,location:"1850 Newport Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: 0, calories: [], duration: 30, length: 4.16, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Black Pond Woods", type: ["Walking", "Running", "Jogging"], date: null,location:" 1905 Traver Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: 0, calories: [], duration: 30, length: 1.12, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Mary Beth Doyle", type: ["Walking", "Running", "Jogging"], date: null,location:"3500 Birch Hollow Drive", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: 0, calories: [], duration: 30, length: 1.24, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Furstenberg", type: ["Walking", "Running", "Jogging"], date: null,location:"2626 Fuller Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: 0, calories: [], duration: 30, length: 1.74, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Marshall", type: ["Walking", "Running", "Jogging"], date: null,location:"Corner of Plymouth and Dixboro Roads", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: 0, calories: [], duration: 30, length: 3.26, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});
                  this.eventsList.push({name:"Cedar Bend", type: ["Walking", "Running", "Jogging"], date: null,location:"1495 Cedar Bend Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: 0, calories: [], duration: 30, length: 1.21, signup: "https://www.a2gov.org/departments/Parks-Recreation/NAP/Natural-Areas-Recreation/Documents/2020_trail_map.pdf"});

                  this.eventsList.push({name:"The Arb", type: ["Walking", "Running", "Jogging"], date: null,location:"1610 Washington Heights", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: 0, calories: [], duration: 30, length: 0, signup: "https://mbgna.umich.edu/wp-content/uploads/2018/02/02-Trail-Overview.pdf"});

                  this.eventsList.push({name:"Fuller Park", type: ["Walking", "Running", "Jogging"], date: null,location:"1519 Fuller Road", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: 0, calories: [], duration: 30, length: 0, signup: "https://www.a2gov.org/departments/Parks-Recreation/parks-places/PublishingImages/Pages/Fuller/FullerLocationMap.png"});

                  this.numEvents = this.eventsList.length;
                  this.totalEventsList = JSON.parse(JSON.stringify(this.eventsList));
          },
          createEvent: function(){
            if(this.newEvent.name == '' || this.newEvent.type == [''] || this.newEvent.price == undefined || 
              this.newEvent.date == null || this.newEvent.location == '' || this.newEvent.duration == undefined) {
                alert("Not all the required fields have been filled out");
            }
            else {
              this.newEvent.type = this.types.split(",");
              this.newEvent.calories = this.cal.split(',').map(i => Number(i));
              this.totalEventsList.push({name: this.newEvent.name, type: this.newEvent.type, date: this.newEvent.date,location:this.newEvent.location, distance: this.newEvent.distance, price: this.newEvent.price, openSpots: this.newEvent.openSpots, peopleAttending: this.newEvent.peopleAttending, reccuring: this.newEvent.reccuring, calories: this.newEvent.calories, duration: this.newEvent.duration, length: this.newEvent.length, signup: this.newEvent.signup});
              this.eventsList.push({name: this.newEvent.name, type: this.newEvent.type, date: this.newEvent.date,location:this.newEvent.location, distance: this.newEvent.distance, price: this.newEvent.price, openSpots: this.newEvent.openSpots, peopleAttending: this.newEvent.peopleAttending, reccuring: this.newEvent.reccuring, calories: this.newEvent.calories, duration: this.newEvent.duration, length: this.newEvent.length, signup: this.newEvent.signup});
              //console.log(this.newEvent);
              this.numEvents++;
              showPage('events');
              this.newEvent.name = '';
              this.newEvent.type = ['']; 
              this.types = '';
              this.cal = '';
              this.newEvent.date = new Date();
              this.newEvent.location = '';
              this.newEvent.distance = undefined;
              this.newEvent.price = null;
              this.newEvent.openSpots = null;
              this.newEvent.peopleAttending = null;
              this.newEvent.reccuring = undefined;
              this.newEvent.calories = [];
              this.newEvent.duration = undefined;
              this.newEvent.length = undefined;
              this.newEvent.signup = '';
            }
          },
          //ADD THIS
          createCalendarEvent: function(event){
            const newDate = event.date;
            d2 = new Date(newDate);
                        
            endDate = d2.setMinutes(newDate.getMinutes()+event.duration);            

            calEvent = {
              start: newDate,
              end: endDate,
              text: event.name,
              location: event.location,
              busy: true
            };

             calEvent.start = new Date(calEvent.start).toISOString()

             calEvent.start = calEvent.start.toString()            

             calEvent.start = calEvent.start.replace(/[^a-zA-Z 0-9]+/g, '')

             calEvent.end = new Date(calEvent.end).toISOString()

             calEvent.end = calEvent.end.toString()

             calEvent.end = calEvent.end.replace(/[^a-zA-Z 0-9]+/g, '')
    
            link = 'http://www.google.com/calendar/event?action=TEMPLATE&text=' + calEvent.text + '&dates=' + 
            calEvent.start + '/' + calEvent.end + '&location=' + calEvent.location;

            link = link.replace(/\s/g, '%')
            console.log(event.date)
            window.open(link)
          }
      }
    });
    
    bigVue.addEvents();


    $('#createaccount').click(function() {
      bigVue.signupParse();
      bigVue.calculateCalories();
  })
  $('#createLogIn').click(function() {
    bigVue.logIn();
    bigVue.calculateCalories();
})

  $('#resetButton').click(function() {
      bigVue.resetEvents();
      bigVue.calculateCalories();
  })

    
});
