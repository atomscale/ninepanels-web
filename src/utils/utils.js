import { useMainStore } from "@/stores/store.js"
import { usePanelStore } from "@/stores/panelStore.js"
import VueCookies from 'vue-cookies'

export async function signOutAllStores() {

    const mainStore = useMainStore()
    const panelStore = usePanelStore()

    await mainStore.signUserOutAction()
    await panelStore.signOut()

}

export function splitSemVer(semver) {

    const elem = semver.split(".")

    const majorMinor = elem.slice(0, 2)

    const versionNumStr = majorMinor.join('.')

    let versionNum = parseFloat(versionNumStr)

    return versionNum
}

export function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export function getAccessToken() {
    const access_token = VueCookies.get("9p_access_token")
    return access_token
}

export function apiError(error) {
    const mainStore = useMainStore()
    console.log(error)
    mainStore.apiError(error)
}