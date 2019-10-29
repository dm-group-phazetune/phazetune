import {deletePost, editPost} from '../redux/reducers/postsReducer'
import {editProfile} from '../redux/reducers/profReducer'
import {handlePlaceChange} from '../Components/FooterNav/AudioUpload'


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
    

    
})