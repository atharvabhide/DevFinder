import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Developers } from '../pages/Developers/Developers'
import { Inbox } from '../pages/Inbox/Inbox'
import { Projects } from '../pages/Projects/Projects'
import { Login } from '../pages/Login/Login'
import { IndividualProject } from '../pages/Projects/IndividualProject/IndividualProject'
import { IndividualDeveloper } from '../pages/Developers/IndividualDeveloper/IndividualDeveloper'
// import {SignUp} from '../pages/ForgotPassword/SignUp'

import { AddProject } from '../pages/Projects/IndividualProject/AddProject/AddProject'
import { UpdateProject } from '../pages/Projects/IndividualProject/UpdateProject/UpdateProject'
import { Modal } from './Modal/Modal'
import { AccountInfo } from '../pages/AccountInfo/AccountInfo'
import { EditProfile } from '../pages/AccountInfo/EditProfile/EditProfile'
import { ForgotPassword } from '../pages/ForgotPassword/ForgotPassword'
import { ResetPassword } from '../pages/ResetPassword/ResetPassword'
import { SendMessage } from '../pages/SendMessage/SendMessage'
import { OpenMessage } from '../pages/Inbox/OpenMessage/OpenMessage'
import { Recommendations } from '../pages/Recommendations/Recommendations'

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
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/add-project" element={<AddProject />} />
      <Route path="/update-project" element={<UpdateProject />} />
      <Route path="/modal" element={<Modal />} />
      <Route path="/account" element={<AccountInfo />} />
      <Route path="/account/edit" element={<EditProfile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/send-message" element={<SendMessage />} />
      <Route path="/open-message" element={<OpenMessage />} />
      <Route path="/recommended-developers" element={<Recommendations />} />
      

      
    </Routes>
  )
}
