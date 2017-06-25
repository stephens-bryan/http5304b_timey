/**
 * Created by bryanstephens on 2017-06-09.
 */

$(document).ready(function(){

    // Note(bryanstephens): by default, Django does not add styling to forms. Needs to be added either my forms widget or thorugh JS
    var noteForm = $('#add_note');
    var input = noteForm.find('#id_note');
    input.addClass('form-control');
    // By default, Django does not create a label for input elements; create a label for text input, then append to input and then append to DOM
    var noteSize = $('div').find('#note_id');
    console.log(noteSize);
    noteSize.addClass('col-xs-4');
    var submit = noteForm.find(':submit');
    submit.addClass('btn btn-default');
    console.log(submit);

    var timestamp;

    var intervalId;

    var start = $('#time').val();
    var timeStamp = $('#id_time').val();
    // Note(bryanstephens): user input needs to be multiplied by 60 (1:60)
    var time = start * 60;
    // Note(bryanstephens): end time is always 0
    var end = 0;

    // Note(bryanstephens): add leading zero to time values less than 10
    function padding(value){
            if (value < 10){
                return '0' + value;
            } else {
                return value;
            }
        }

    function timestampInterval(){
            intervalId = setInterval(timey, 1000, time, end);
    }

    // initialize timer; countdown is based upon user input
    function timey(){

            var result = time - end;

            var date = new Date();
            var minute = Math.floor(result / 60);
            var second = result - minute * 60;

            timestamp = "Date: " + date.toDateString() + ". Time: " + padding(minute) + ":" + padding(second);

            // Note(bryanstephens): assign timestamp value to id_time input value
            timeStamp = timestamp;

            // Note(bryanstephens): once timer reaches 0, stop timer and add/remove hidden class to elements (hide note form, display timer)
            if (time <= end){
                console.log('finished');
                $('#add_note').addClass('hidden');
                $('#timer').removeClass('hidden');
                clearInterval(intervalId);
            }
            // Note(bryanstephens): as interval goes, end time goes up until it reaches
            end++;
    }

    // Note(bryanstephens): user enters a valid time, which starts the timer and enables note-taking form
    $(document).on('submit', '#timer', function(e) {
        $('#add_note').removeClass('hidden');
        $('#timer').addClass('hidden');
        e.preventDefault();
        var start = $('#time').val();
        var timeVal = start * 60;
        var endVal = 0;

        var test = timestampInterval(time = timeVal, end = endVal);

            // Note(bryanstephens): AJAX form to submit note to DB
            $(document).on('submit', '#add_note', function(e){
                e.preventDefault();
                var note = $('#id_note').val();
                // Note(bryanstephens): add note
                $.ajax({
                    type: 'POST',
                    url: '/timey/make_note/',
                    data: {
                        note: note,
                        time: timeStamp,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                    },
                    success:function(){
                        console.log(note + " submitted at  " + timeStamp);
                    }
                });
                // Note(bryanstephens): retrieve notes
                $.ajax({
                    type: "GET",
                    url: "/timey/view_notes/",
                    success: function(data){
                        // Note(bryanstephens): grab value; parse it; loop through it and grab elements specific to notes and time
                        var result = JSON.parse(data);
                        result.forEach(function(element){
                           console.log(element.fields.note, element.fields.time);
                        });
                    },
                    error: function(e){
                        console.log(e);
                    }
                });
            });


    });
});