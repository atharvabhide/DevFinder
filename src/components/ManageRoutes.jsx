import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Developers } from '../pages/Developers/Developers'
import { Inbox } from '../pages/Inbox/Inbox'
import { Projects } from '../pages/Projects/Projects'
import { Login } from '../pages/Login/Login'
import { IndividualProject } from '../pages/Projects/IndividualProject/IndividualProject'
import { IndividualDeveloper } from '../pages/Developers/IndividualDeveloper/IndividualDeveloper'
import {SignUp} from '../pages/SignUp/SignUp'
import { AddProject } from '../pages/Projects/IndividualProject/AddProject/AddProject'
import { Modal } from './Modal/Modal'
import { AccountInfo } from '../pages/AccountInfo/AccountInfo'
import { EditProfile } from '../pages/AccountInfo/EditProfile/EditProfile'

export const ManageRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/project" element={<IndividualProject />} />
      <Route path='/developers/developer' element={<IndividualDeveloper />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/add-project" element={<AddProject />} />
      <Route path="/modal" element={<Modal />} />
      <Route path="/account" element={<AccountInfo />} />
      <Route path="/account/edit" element={<EditProfile />} />


      
    </Routes>
  )
}
