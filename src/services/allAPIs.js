// actual api call

import { baseUrl } from "./baseUrl"
import { commonAPI } from "./commonApi"


//1  register api call
export const registerAPI = async (user) => {
    return await commonAPI('post', `${baseUrl}/register`, user, "")
}

//2 login api call
export const loginAPI = async (user) => {
    return await commonAPI('post', `${baseUrl}/login`, user, "")
}

//3 Add project API call - post - body
export const addProjectApi = async (reqBody, reqHeader) => {
    return await commonAPI("post", `${baseUrl}/projects/add`, reqBody, reqHeader)
}

//4 get home projects API call - get
export const getHomeProjectAPI = async () => {
    return await commonAPI("get", `${baseUrl}/projects/home-projects`, "", "")
}

//5 get all project api call
export const getAllProjectAPI = async (searchKey,reqHeader) => {
    return await commonAPI("get",` ${baseUrl}/projects/all-projects?search=${searchKey}`, "", reqHeader)
}

//get particular user data
export const getUserProjectAPI = async (reqHeader) => {
    return await commonAPI("get",`${baseUrl}/projects/all-user-projects`,"",reqHeader)
}

//edit user project 
export const editUserProject = async (projectId,reqBody,reqHeader) => {
    return await commonAPI("put",`${baseUrl}/projects/update-projects/${projectId}`,reqBody,reqHeader)
}

//delete user project 
export const deleteUserProjectAPI = async(projectId,reqHeader) => {
return await commonAPI("delete",`${baseUrl}/projects/delete-projects/${projectId}`,{},reqHeader)
 }