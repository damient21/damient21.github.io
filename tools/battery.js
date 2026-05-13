/* 
HTML & CSS Setup:
<style>
    #battery {
        z-index: 1000;
        font-weight: bold;
        transition: color 1s ease-in-out; 
    }
    #o {
        font-size: 40px;
        font-weight: 900;
        position: fixed;
        right: 48.5px;
        transition: color 1s ease-in-out; 
    }
</style>
<div id="o">Battery: --%</div>
<div id="battery">Battery: --%</div>
*/

if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
        function updateBattery() {
            const level = Math.round(battery.level * 100);
            const chargingIcon = battery.charging ? "⚡" : "";
            const batteryEl = document.getElementById("battery");
            const proxyBatteryEl = document.getElementById("o");
            
            batteryEl.innerText = `Battery: ${level}%${chargingIcon}`;
            proxyBatteryEl.innerText = `Battery: ${level}%${chargingIcon}`;
            
            let currentColor = 'green';
            if (level <= 25) {
                currentColor = 'red';
            } else if (level <= 55) {
                currentColor = 'orange';
            } else if (level <= 90) {
                currentColor = 'yellow';
            }
            
            batteryEl.style.color = currentColor;
            proxyBatteryEl.style.color = currentColor;
        }
    
        updateBattery();
        battery.addEventListener("chargingchange", updateBattery);
        battery.addEventListener("levelchange", updateBattery);
    });
} else {
    document.getElementById("battery").innerText = "Battery: N/A";
}
