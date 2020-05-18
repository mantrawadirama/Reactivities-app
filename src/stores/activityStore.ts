import { observable } from 'mobx'
import { createContext } from 'react'

class ActivityStore {
  @observable title = 'Hellp from mobx'
}

export default createContext(new ActivityStore())
