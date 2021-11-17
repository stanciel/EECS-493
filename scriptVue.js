var user= new Vue({
    el: "#app",
    data() {
        return {
          email: '',
          password: '',
          address: '',
          age: 0,
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
          //if male
          //BMR = 10W + 6.25H - 5A + 5

          //if female
          //BMR = 10W + 6.25H - 5A - 161
      },
      sortEvents: function() {
        //sort based 
          
      },
      addEvents: function() {
          //add more events
          this.eventsList.push({name:"Fiat", location:"500", distance:"white", price: 0, openSpots: 0, peopleAttending: 0, reccuring: false, calories: 0});
          //update numEvents
      }
  }
})
