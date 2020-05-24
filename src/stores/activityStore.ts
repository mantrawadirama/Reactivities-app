import { RootStore } from './rootStore'
import { history } from './../index'
import { IActivity } from './../models/activity'
import { observable, action, computed, runInAction } from 'mobx'
import { SyntheticEvent } from 'react'
import ActivityService from '../service/ActivityService'
import { toast } from 'react-toastify'

export default class ActivityStore {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @observable activityRegistry = new Map()
  @observable activity: IActivity | null = null
  @observable loadingInitial = false
  @observable submitting = false
  @observable target = ''

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    )
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split('T')[0]
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity]
        return activities
      }, {} as { [key: string]: IActivity[] })
    )
  }
  @action loadActivities = async () => {
    this.loadingInitial = true
    try {
      const activities = await ActivityService.Operations.list()
      runInAction('loading activities', () => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date)
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
      return activity
    } else {
      this.loadingInitial = true
      try {
        activity = await ActivityService.Operations.details(id)
        runInAction('getting activity', () => {
          activity.date = new Date(activity.date)
          this.activity = activity
          this.activityRegistry.set(activity.id, activity)
          this.loadingInitial = false
        })
        return activity
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
      history.push(`/activities/${activity.id}`)
    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false
      })
      toast.error('Problem submitting data')
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
      history.push(`/activities/${activity.id}`)
    } catch (error) {
      runInAction('edit activity error', () => {
        this.submitting = false
      })
      toast.error('Problem submitting data')
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
