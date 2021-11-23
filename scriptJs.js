$(document).ready(function () {
    //vue objects
    var user= new Vue({
        el: "#app",
        data() {
            return {
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
              // BMR: 0,
    
              //events
              eventsList: [],
              numEvents: 0,
              search: '',
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
                //keyword search
                if(this.search){
                  return this.eventsList.filter((item)=>{
                    return (this.eventsList.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v)) || this.eventsList.type.forEach(
                      type => {type.toLowerCase().split(' ').every(v => type.toLowerCase().includes(v))}))
                  })
                }
              },
              calculateCalories: function() {
                calorieRates [{cycling: 0, walking: 0, running: 0}]; 
                this.eventsList.forEach(element => {
                  element.type.forEach(typeElement => {
                    //search in calorie array for the type to get calorie count - array find
                    //push to event calories array
                  })
                })
                
              },
              calculateDistance: function() {
    
              },
              sortEvents: function() {
                //sort based 
                  
              },
              addEvents: function() {
                  //add more events
                  this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling"], location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: 0, peopleAttending: 0, reccuring: false, calories: [0], duration: 60});
                  //update numEvents
          }
      }
    })
    
    
    
    
    
    
    
    //additional java script code
    $('.signup').click(function() {
        var forms = document.getElementsByClassName("signup-form");
        for(let f of forms) {
            f.style.display = "block";
        }
    });

});
