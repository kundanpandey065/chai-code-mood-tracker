
	const myBtn = document.getElementById("mySubmitBtn")
	const myMoodOption = document.getElementById("myMood")
	
	
	let allArr = []  // initialize new array

	const year = new Date().getFullYear();
	const month = new Date().getMonth()+1;
	const day = new Date().getDate();

	const today = day.toString().padStart(2, '0')+"-"+month.toString().padStart(2, '0')+"-"+year // full date by DD MM YYYY

    // console.log(today)
    
    
    showMoodHistory()

	myBtn.addEventListener("click", myFunction);

	function myFunction() {
		let moodLogsObj = {}
		moodLogsObj.mood = myMoodOption.value;
		moodLogsObj.created_at = today;	

		allArr.push(moodLogsObj);		
				
		const newdata2 =  JSON.parse(localStorage.getItem('fullEmojiData'));

		if(newdata2!=null){
			// let lastValue = newdata2.length-1;
			let lastDateValue = newdata2[newdata2.length-1].created_at
			if(lastDateValue===today){
				console.log("Matched");
				newdata2.pop();
				newdata2.push(moodLogsObj);
				localStorage.setItem("fullEmojiData", JSON.stringify(newdata2));

                showMoodHistory()

			}else{
				console.log("Not Matched");				
				newdata2.push(moodLogsObj);
				console.log(JSON.stringify(newdata2))
				localStorage.setItem("fullEmojiData", JSON.stringify(newdata2));

                showMoodHistory()
			}
		}else{
			console.log("Else Part running--"+newdata2)
			localStorage.setItem("fullEmojiData", JSON.stringify(allArr));

            showMoodHistory()
		}
		// console.log(newdata2)
	}


    function showMoodHistory() {
        const eventsData = JSON.parse(localStorage.getItem('fullEmojiData'));

        if(eventsData!=null){
            const calendarEvents = eventsData.map(item => ({
                title: item.mood,
                start: item.created_at.split("-").reverse().join("-"),
                end: item.created_at.split("-").reverse().join("-"),
            }));
            console.log(calendarEvents);
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                initialView: 'dayGridMonth',
                events: calendarEvents
            });

            calendar.render();
        }
    }

