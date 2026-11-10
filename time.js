getServerTime = async () => {
  try {
    // Отправляем запрос на свой сервер (или любой публичный API)
    const response = await fetch(window.location.href, { method: 'HEAD' });
    
    // Достаем строку даты из заголовков
    const serverDateStr = response.headers.get('date'); 
    
    // Конвертируем в объект даты JS
    let serverDate = new Date(serverDateStr);
    serverDate.setHours(0, 0, 0, 0)

    
    console.log("Точное время сервера:", serverDate);
    return serverDate;
  } catch (error) {
    console.error("Ошибка получения времени:", error);
    return new Date(); // Фолбэк на локальное время в случае сбоя
  }
}


getMonth = async () => {
  let daysOfMonth = []
  let unixTimeMonth = []
  let today = await getServerTime()
  daysOfMonth.push(today)
  for(let i = 0; i <= 30; i++){
    let copyDate = new Date(daysOfMonth[i])
    daysOfMonth.push(new Date(copyDate.setDate(daysOfMonth[i].getDate() - 1)))
  }
  console.log(daysOfMonth)
  /*
  for (let i = 0; i <= daysOfMonth.length - 1 ; i++) {
    let copyDate = new Date(daysOfMonth[i])
    unixTimeMonth.push(new Date(copyDate.setDate(daysOfMonth[i].getDate())))
  }
  console.log("here " + unixTimeMonth)
  */
  return  daysOfMonth;
  
}

getMonthToUnix = async (datesArray) => {
  tempArr = []
  datesArray.forEach( (date) =>{
    tempArr.push( date.getTime().toString() )
  } 
  )
  //console.log(tempArr)
  return tempArr

}
