$(document).ready(function () {
    //old vue code 
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
              sortPrice: false
            }
          },
          methods: {
              // calculateBMR:function() {
              //   if (this.gender === "female") {
              //     this.BMR = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
              //   }
              //   else {
              //     this.BMR = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
              //   }
              // }
              submit:function() {
                  alert("submitted")
                //keyword search
                if(this.search){
                  return this.eventsList.filter((item)=>{
                    return (this.eventsList.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v)) || this.eventsList.type.forEach(
                      type => {type.toLowerCase().split(' ').every(v => type.toLowerCase().includes(v))}))
                  })
                }
              },
              //ONLY CALL CALCULATE CALORIES IF USER WEIGHT IS NOT NULL
              calculateCalories: function() {
                var MET = [{name: "cycling", num: 0}, {name: "walking", num: 0}, {name: "running", num: 0}, {name: "zumba", num: 0}, {name: "kickboxing", num: 0},
                {name: "hiit", num: 0}, {name: "yoga", num: 0}, {name: "cardio", num: 0}]
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
                  //new Date(2021, 12, 7, 7, 15)
                  //recurrs mon-Fri
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], date: new Date(2021, 12, 8, 7, 15),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], date: new Date(2021, 12, 8, 8, 30),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], date: new Date(2021, 12, 7, 4),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], date: new Date(2021, 12, 7, 5, 15),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], date: new Date(2021, 12, 7, 6, 30),location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                //recurrs Sat-Sun
                //   this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], date: "Sat-Sun" ,time:"8:00",location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                //   this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], date: "Sat-Sun" ,time:"9:15",location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                //   this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], date: "Sat-Sun" ,time:"10:30",location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 60, signup: "https://clients.mindbodyonline.com/classic/mainclass"});
                //   //update numEvents
                //   //IM 
                //   this.eventsList.push({name:"Metabolic Circuit", type: ["strength", "cardio"], date: "Mon" ,time:"12:00",location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Cycle", type: ["cycling"], date: "Mon" ,time:"4:30",location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Tabata", type: ["hiit"], date: "Mon" ,time:"4:45",location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Cardio Kickboxing", type: ["kickboxing"], date: "Mon" ,time:"5:00",location:"NCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Zumba", type: ["zumba"], date: "Mon" ,time:"5:15",location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Zumba", type: ["zumba"], date: "Mon" ,time:"5:30",location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Cycle", type: ["cycling"], date: "Mon" ,time:"5:45",location:"CCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Total Body Strength", type: ["strength"], date: "Mon" ,time:"6:00",location:"NCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Restorative Flow", type: ["yoga", "stretch"], date: "Mon" ,time:"7:00",location:"Virtual(Zoom)", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Slow Flow", type: ["yoga"], date: "Mon" ,time:"7:15",location:"NCRB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});
                //   this.eventsList.push({name:"Strength & Sculpt", type: ["cardio", "hiit", "strength"], date: "Mon" ,time:"7:15",location:"IMSB", distance:0, price: null, openSpots: null, peopleAttending: null, reccuring: true, calories: [], duration: 50, signup: "https://recsports.umich.edu/groupx/schedule/"});      
                  //update numEvents
          }
      }
    })
    
    
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
    $('.signup').click(function() {
        var forms = document.getElementsByClassName("signup-form");
        for(let f of forms) {
            f.style.display = "block";
        }
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
