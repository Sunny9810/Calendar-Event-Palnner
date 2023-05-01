// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings={};
dayjs.localeSettings(localeSettings);
$(function () {
  //Using the dayjs() function to get the current hour of the day in 24-hour format using the format() method with the 'H' format specifier, which returns the hour as a number between 0 and 23.
  const currentHour = dayjs().format ('H') 
  //For each element assign id attribute, which is assumed to be a number representing the hour in 24-hour format. toggleClass() method  adds or removes the past, present, and future classes based on whether the blockHour.
  function hourlyColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    }); 
  }
  //Add a listener for click events on the save button.
  function textEntry(){
    $('.saveBtn').click(function(){
      const key = $(this).parent().attr('id');
      const value = $(this).sibilings('.description').val();
      localStorage[key]= value;
    })
  }

  // The function below will refresh the color of each time block based on whether it's in the past(grey), present(red), or future(green) relative to the current time. 
  function refreshColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // This will get the user input from the localStorage and set textarea values for each time block.
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  //Will display the current date an time
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd,MMMM D','YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

  //calling functions
hourlyColor();
textEntry();
refreshColor();
 
 
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
