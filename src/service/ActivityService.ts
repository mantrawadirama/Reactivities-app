import { IActivity } from './../models/activity'
import { AxiosRequest } from './../API/BaseService'

export const fetchAllActivities = async () => {
  try {
    return await AxiosRequest.get('/activities')
  } catch (error) {
    console.log(error)
  }
}
