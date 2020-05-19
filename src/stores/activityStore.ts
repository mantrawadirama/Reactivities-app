import { IActivity } from './../models/activity'
import { observable, action, computed, configure, runInAction } from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import ActivityService from '../service/ActivityService'

configure({ enforceActions: 'always' })
class ActivityStore {
  @observable activityRegistry = new Map()
  @observable activity: IActivity | null = null
  @observable loadingInitial = false
  @observable submitting = false
  @observable target = ''

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    )
  }

  @action loadActivities = async () => {
    this.loadingInitial = true
    try {
      const activities = await ActivityService.Operations.list()
      runInAction('loading activities', () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split('.')[0]
          this.activityRegistry.set(activity.id, activity)
        })
        this.loadingInitial = false
      })
    } catch (error) {
      runInAction('loading activities error', () => {
        this.loadingInitial = false
      })
      console.log(error)
    }
  }

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    if (activity) {
      this.activity = activity
    } else {
      this.loadingInitial = true
      try {
        activity = await ActivityService.Operations.details(id)
        runInAction('getting activity', () => {
          this.activity = activity
          this.loadingInitial = false
        })
      } catch (error) {
        runInAction('get activity error', () => {
          this.loadingInitial = false
        })
        console.log(error)
      }
    }
  }

  @action clearActivity = () => {
    this.activity = null
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id)
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true
    try {
      await ActivityService.Operations.create(activity)
      runInAction('create activity', () => {
        this.activityRegistry.set(activity.id, activity)

        this.submitting = false
      })
    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false
      })
      console.log(error)
    }
  }

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true
    try {
      await ActivityService.Operations.update(activity)
      runInAction('edit activity', () => {
        this.activityRegistry.set(activity.id, activity)
        this.activity = activity
        this.submitting = false
      })
    } catch (error) {
      runInAction('edit activity error', () => {
        this.submitting = false
      })
      console.log(error)
    }
  }

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    try {
      this.submitting = true
      this.target = event.currentTarget.name
      await ActivityService.Operations.delete(id)
      runInAction('delete activity', () => {
        this.activityRegistry.delete(id)
        this.submitting = false
        this.target = ''
      })
    } catch (error) {
      runInAction('edit activity error', () => {
        this.submitting = false
        this.target = ''
      })
      console.log(error)
    }
  }
}

export default createContext(new ActivityStore())
