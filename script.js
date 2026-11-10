mainWindow = document.getElementById('body_window')
inputWindow = document.getElementById('input_window')
backButtons = document.getElementsByClassName('backButton')
infoWindow = document.getElementById("info_window")
info30dayWindow = document.getElementById("info30dayWindow")


ads_showed = false;
show_baner()


document.getElementById('openInputWindow').onclick = () => {
	if (ads_showed === false) {
		ads_showed = true
		show_fullscreen_ad();
	}
	mainWindow.style.display = "none";
	inputWindow.style.display = "flex";
}
document.getElementById('info_button').onclick = () => {
	if (ads_showed === false) {
		ads_showed = true
		show_fullscreen_ad();
	}
	mainWindow.style.display = "none";
	infoWindow.style.display = "flex";
}
document.getElementById('blood_presshur_30days_history_button').onclick = () => {
	if (ads_showed === false) {
		ads_showed = true
		show_fullscreen_ad();
	}
	mainWindow.style.display = "none";
	info30dayWindow.style.display = "flex";
}


backToMainWindow = (button) => {
	button.onclick = () =>{
		mainWindow.style.display = "flex";
		inputWindow.style.display = "none";
		infoWindow.style.display = "none";
		info30dayWindow.style.display = "none";

	}

}


for (var i = backButtons.length - 1; i >= 0; i--) {
	backToMainWindow(backButtons[i])
}



getValues = async () => {
	let datesOfLastMonth = await getMonth();
	console.log(datesOfLastMonth[0].getTime().toString())
	let datesOfLastMonthUnix = await getMonthToUnix(datesOfLastMonth)
	const valuesFromServer = await get_values(datesOfLastMonthUnix)
	console.log("HERE")
	console.log(valuesFromServer)
	console.log(typeof(valuesFromServer))
	console.log("HERE")

	for (const key in valuesFromServer) {
	  // Проверяем, что свойство принадлежит именно этому объекту, а не его прототипу
	  if (valuesFromServer.hasOwnProperty(key)) {
	    // Если значение равно пустой строке, меняем его
	    if (valuesFromServer[key] === "") {
	      valuesFromServer[key] = {
	      							valueOfUpper:"---",
	      							valueOfDown:"---",
	      							pulse:"---"
	      							}; 
	    }else{
	    	valuesFromServer[key] = JSON.parse(valuesFromServer[key])
	    }
	  }
	}

	console.log(datesOfLastMonthUnix)
	for(let i = 0; i < 5; i++){
		let dailyValuesMorning = valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].valueOfUpper + "/" + valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].valueOfDown + "/" + valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].pulse;
		console.log(dailyValuesMorning)
		console.log(datesOfLastMonthUnix[i])

		document.getElementById("free").insertAdjacentHTML("afterend", `<div class = "day">
																			<div class = "date">${datesOfLastMonth[i].toLocaleDateString('ru-RU')}</div>
																			<div class = "timesOfDay"> 
																				<div class = "values">УТРО</div>
																				<div class = "values valuesOfChange datBug">${valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].valueOfUpper}/${valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].valueOfDown}/${valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].pulse}</div>
																			</div>
																			<div class = "timesOfDay">
																				<div class = "values">ВЕЧЕР</div>
																				<div class = "values valuesOfChange datBug">${valuesFromServer[`${datesOfLastMonthUnix[i]}_1`].valueOfUpper}/${valuesFromServer[`${datesOfLastMonthUnix[i]}_1`].valueOfDown}/${valuesFromServer[`${datesOfLastMonthUnix[i]}_1`].pulse}</div>
																			</div>
																		</div>`)
	}
	for(let i = 0; i <= 30; i++){
		let dailyValuesMorning = valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].valueOfUpper + "/" + valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].valueOfDown + "/" + valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].pulse;
		console.log(dailyValuesMorning)
		console.log(datesOfLastMonthUnix[i])

		document.getElementById("a30days_free").insertAdjacentHTML("afterend", `<div class = "day">
																			<div class = "date">${datesOfLastMonth[i].toLocaleDateString('ru-RU')}</div>
																			<div class = "timesOfDay"> 
																				<div class = "values">УТРО</div>
																				<div class = "values valuesOfChange">${valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].valueOfUpper}/${valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].valueOfDown}/${valuesFromServer[`${datesOfLastMonthUnix[i]}_0`].pulse}</div>
																			</div>
																			<div class = "timesOfDay">
																				<div class = "values">ВЕЧЕР</div>
																				<div class = "values valuesOfChange">${valuesFromServer[`${datesOfLastMonthUnix[i]}_1`].valueOfUpper}/${valuesFromServer[`${datesOfLastMonthUnix[i]}_1`].valueOfDown}/${valuesFromServer[`${datesOfLastMonthUnix[i]}_1`].pulse}</div>
																			</div>
																		</div>`)
	}

	document.getElementById("todayValue").value = `Сегодня: ${datesOfLastMonth[0].toLocaleDateString('ru-RU')}`
	document.getElementById("form_output_button").onclick = async () => {
		animateButton(document.getElementById("form_output_button"))
		let valueOfUpper = document.getElementById("up").value
		let valueOfDown = document.getElementById("down").value
		let valueOfPulse = document.getElementById("pulse").value
		let timeOfDay = document.getElementById("timeOfDaySelect").value
		if ( (valueOfUpper === "") || (valueOfDown === "") || (valueOfPulse === "") || timeOfDay === "" ) {
			emptyInput();
		}else{			
			const todayDateObj = new Object;
			todayDateObj.valueOfUpper = valueOfUpper ;
			todayDateObj.valueOfDown = valueOfDown ;
			todayDateObj.pulse = valueOfPulse;
			todayDateObj.timeOfDay = timeOfDay;
			todayDateObj.date = datesOfLastMonthUnix[0] + `_${timeOfDay}`;

			jsonString = await JSON.stringify(todayDateObj)
			console.log(jsonString)
			console.log(todayDateObj.date)
			save_value(todayDateObj.date, jsonString)
			const dateNowDom = document.getElementsByClassName("valuesOfChange")
			const datBug = document.getElementsByClassName("datBug")
			if ((todayDateObj.timeOfDay === "0") && todayDateObj.valueOfUpper != "" && todayDateObj.valueOfDown != "" && todayDateObj.pulse != "") {
				dateNowDom[dateNowDom.length - 2].innerText = `${todayDateObj.valueOfUpper}/${todayDateObj.valueOfDown}/${todayDateObj.pulse}`
				datBug[datBug.length - 2].innerText = `${todayDateObj.valueOfUpper}/${todayDateObj.valueOfDown}/${todayDateObj.pulse}`
			}else if((todayDateObj.timeOfDay === "1") && todayDateObj.valueOfUpper != "" && todayDateObj.valueOfDown != "" && todayDateObj.pulse != "") {
				dateNowDom[dateNowDom.length - 1].innerText = `${todayDateObj.valueOfUpper}/${todayDateObj.valueOfDown}/${todayDateObj.pulse}`
				datBug[datBug.length - 1].innerText = `${todayDateObj.valueOfUpper}/${todayDateObj.valueOfDown}/${todayDateObj.pulse}`

			}
		}
		goodInput()
}
document.getElementById("LOL").style.display = "none"



}
getValues()






emptyInput = () => {
	document.getElementById("empty_input").style.display = "flex"
	setTimeout(() => {
		document.getElementById("empty_input").style.display = "none";
	}
		,800)
}
goodInput = () => {
	document.getElementById("goodInput").style.display = "flex"
	setTimeout(() => {
		document.getElementById("goodInput").style.display = "none";
	}
		,800)
}


animateButton = (button) => {

		
		  setTimeout(function (){
			    button.style.backgroundColor = "#453b3b"
			    button.style.color = "#FFF"
			  },300)
			    button.style.backgroundColor = "#FFF"
			    button.style.color = "black"
		
	
}