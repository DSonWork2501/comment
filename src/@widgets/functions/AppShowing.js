import {AppShowing} from '@widgets/metadatas'

/**
 * Get app showing
 */
export const getAppShowing = (isFoxyTV, isSecondScreen) => {
    let appShowing = []
    if ("1" === `${isFoxyTV}`) {
        appShowing = [`${AppShowing.FoxyTv.id}`]
    }
    if("0" ===  isSecondScreen){
        appShowing = [...appShowing,`${AppShowing.Fbox.id}`]
    }else if("2" === isSecondScreen){
        appShowing = [...appShowing,`${AppShowing.App.id}`]
    }else if("1" === isSecondScreen){
        appShowing = [...appShowing,`${AppShowing.Fbox.id}`, `${AppShowing.App.id}`]
    }
    return appShowing;
}

export const getAppShowingDetail = appShowing => {
    let foxyTV = [...appShowing].find(item => parseInt(item) === AppShowing.FoxyTv.id)
    let secondScreen = [...appShowing].filter(item => parseInt(item) === AppShowing.App.id || parseInt(item) === AppShowing.Fbox.id)
    return {
        isFoxyTV: foxyTV ? "1" : "0",
        isSecondScreen: secondScreen.length > 0 ? secondScreen.length === 2 ? "1" : secondScreen[0] : "0"
    }
}