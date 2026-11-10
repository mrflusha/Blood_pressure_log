vkBridge.send("VKWebAppInit", {});




save_value = async (key,val) =>{

  await vkBridge.send('VKWebAppStorageSet', {
           key: key,
           value: val
          })
          .then((data) => { 
            if (data.result) {
              console.log("uspeh " + key+ " "+val)// Значение переменной задано
            }
          })
          .catch((error) => {
            // Ошибка
            console.log(error);
          });

}




get_values = async (datesArr) => {
		let datesArrMorning = []
		let datesArrEvening = []
		await datesArr.forEach( (date) => {
			datesArrMorning.push(date + "_0")
			datesArrEvening.push(date + "_1")
		} )
		const combined = await datesArrMorning.concat(datesArrEvening)
		console.log(combined)

        const valuesArr = await vkBridge.send('VKWebAppStorageGet', {
          keys: combined})
          .then((data) => { 
            if (data.keys) {
              const result = Object.fromEntries(
                      data.keys.map(item => [item.key, item.value])
                    );
              console.log(result);      // "89"
              console.log(typeof(result));
              
              return result// Значения получены
            }
          })
          .catch((error) => {
            // Ошибка
            console.log(error);
          });


        console.log(valuesArr)

        return valuesArr
}


show_baner = () => {
    vkBridge.send('VKWebAppShowBannerAd', {
          banner_location: 'bottom'
          })
         .then((data) => { 
            if (data.result) {
              // Баннерная реклама отобразилась
            }
          })
          .catch((error) => {
            // Ошибка
            console.log(error);
          });
}



show_fullscreen_ad = () => {
        document.getElementById("adv_block_flex").style.display = "flex";                               
        setTimeout(function(){
            document.getElementById("adv_block").innerText = "Реклама будет показана через " + "3";
        },1)
        setTimeout(function(){
            document.getElementById("adv_block").innerText = "Реклама будет показана через " + "2";
        },1000)
        setTimeout(function(){
            document.getElementById("adv_block").innerText = "Реклама будет показана через " + "1";
        },2000)
        setTimeout(function(){
            document.getElementById("adv_block").innerText = "Реклама будет показана через " + "0";
            vkBridge.send('VKWebAppShowNativeAds', {
              ad_format: 'interstitial' /* Тип рекламы */
              })
              .then( (data) => { 
                if (data.result) {
                  // Реклама была показана
                } else {
                  // Ошибка
                }
              })
              .catch((error) => { console.log(error); });                                   
            },3000)
            setTimeout(function(){
                document.getElementById("adv_block").innerText = ""
                document.getElementById("adv_block_flex").style.display = "none";

            }, 4000)
}