import { Test } from '../Type'
import { v2 } from '../../../../lib/index.js'
import { methodTesterBlocking } from './.createFiles'

export default ((info, isValid) =>
{
    methodTesterBlocking(info, isValid, (port, user1, user2, cb) => {
        info.req({
            url: 'http://localhost:' + port + '/folder/folder2/folder3/folder4/file',
            method: 'MOVE',
            headers: {
                Authorization: 'Basic ' + user2,
                Destination: '/folder/folder2/folder3/folder4/file2'
            }
        }, v2.HTTPCodes.Locked, () => {
            info.req({
                url: 'http://localhost:' + port + '/folder/folder2/folder3/folder4/file',
                method: 'MOVE',
                headers: {
                    Authorization: 'Basic ' + user1,
                    Destination: '/folder/folder2/folder3/folder4/file2'
                }
            }, v2.HTTPCodes.Created, () => {
                cb();
            })
        })
    })

}) as Test;
