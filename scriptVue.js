var user= new Vue({
    el: "#app",
    data() {
        return {
          email: '',
          password: '',
          address: '',
          age: 0,
          gender: ' ',
          zipcode: 0,
          height: 0,
          weight: 0,
          firstname: '',
          lastname: '',
        }
      },
      methods: {
          checkPasswords:function(one, two) {
              if(one === two) {
                return 1
              }
              return 0
          },
          createAccount:function() {
            console.log("hi")
            console.log(this.email)
            console.log(this.firstname)
          },
      }
})
var eventsInfo = new Vue({
  el: '#app',
  data: {
      eventsList: [],
      numEvents: 0,
      search: '',

  },
  methods: {
      submit:function() {
        //keyword search
        
      },
      calculateCalories: function() {
        if (user.gender === "male") {

        }
          //if male
          //BMR = 10W + 6.25H - 5A + 5

          //if female
          //BMR = 10W + 6.25H - 5A - 161
      },
      calculateDistance: function() {

      },
      sortEvents: function() {
        //sort based 
          
      },
      addEvents: function() {
          //add more events
          this.eventsList.push({name:"MVMNT Fit Cycling", type: ["cycling", "HIIT"], location:"1300 South University Avenue suite 6 , Ann Arbor MI 48104", distance:0, price: null, openSpots: 0, peopleAttending: 0, reccuring: false, calories: 0, duration: 60});
          //update numEvents
      }
  }
})
