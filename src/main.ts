import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('zones/exitWA').subscribe(() => {
        console.log('exitWA');
        currentPopup = WA.ui.openPopup("exitWAPopup", "Teleport to meet the team!", [
            {label: 'Later', className: 'normal', callback: () => closePopup()},
            {label: 'Hell yeah!', className: 'primary', callback: () =>  WA.nav.goToPage("https://play.staging.workadventu.re/@/tcm/workadventure/wa-village")}
        ]);
    })
    WA.room.onLeaveLayer('zones/exitWA').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
