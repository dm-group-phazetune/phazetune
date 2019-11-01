import {deletePost, editPost, getUsersPosts} from '../redux/reducers/postsReducer'
import {editProfile, getProfile} from '../redux/reducers/profReducer'
import {getGenre} from '../redux/reducers/genreReducer'


describe("post reducer test", () => {
    test("deletePost returns right type", () => {
        expect(deletePost({}).type).toBe('DELETE_POST')
    })
    test("editPost returns right type", () => {
        expect(editPost({}).type).toBe('EDIT_POST')
    })
    test('editProfile returns right type', () => {
        expect(editProfile({}).type).toBe('EDIT_PROFILE')
    })
    test('getUsersPost returns right data type', ()=> {
        expect(getUsersPosts({}).type).toBe('GET_USERS_POSTS')
    })
    test('getGenre returns right type', () => {
        expect(getGenre({}).type).toBe('GET_GENRE')
    })
})