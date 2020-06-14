import { history } from './../index'
import { RootStore } from './rootStore'
import { IUser, IUserFormValues } from './../models/user'
import { observable, computed, action, runInAction } from 'mobx'
import Service from '../service/Service'

export default class UserStore {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @observable user: IUser | null = null

  @computed get isLoggedIn() {
    return !!this.user
  }

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await Service.User.register(values)

      this.rootStore.commonStore.setToken(user.token)
      this.rootStore.commonStore.setRefreshToken(user.refreshToken)
      this.rootStore.modalStore.closeModal()
      history.push('/activities')
    } catch (error) {
      throw error
    }
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await Service.User.login(values)
      runInAction(() => {
        this.user = user
      })
      this.rootStore.commonStore.setToken(user.token)
      this.rootStore.commonStore.setRefreshToken(user.refreshToken)
      this.rootStore.modalStore.closeModal()

      history.push('/activities')
    } catch (error) {
      throw error
    }
  }

  @action logout = () => {
    this.rootStore.commonStore.setToken(null)
    this.rootStore.commonStore.setRefreshToken(null)
    this.user = null
    history.push('/')
  }

  @action getUser = async () => {
    try {
      const user = await Service.User.current()
      runInAction(() => {
        this.user = user
      })
    } catch (error) {
      console.error()
    }
  }
}
