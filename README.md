# Mirror-Project

## Installation

---

---

### 1. Clone this repo:

```
git clone https://<your bitbucket username>@bitbucket.org/pixel_softwares/blockchain.git
cd blockchain/Mirror-Project
```

---

---

### 2. Install dependencies

```sh
yarn
```

or

```sh
npm i
```

---

---

### 3. Run the test suite (which also has all the functionality)

```sh
yarn test
```

or

```sh
npm run test
```

---

---

### 4. Deploy scripts (before deployment see point no. 5)

```
yarn deployMain (for mainnet)
```

---

```
yarn deployTest (for testnet)
```

---

---

# Mirror Contract Defined Errors

---

---

## AlreadyJoined

```solidity
error AlreadyJoined()
```

---

---

## NotJoined

```solidity
error NotJoined()
```

---

---

## InvalidData

```solidity
error InvalidData()
```

---

---

## NotAuthorised

```solidity
error NotAuthorised()
```

---

---

## AddressZero

```solidity
error AddressZero()
```

---

---

## AlreadyBlocked

```solidity
error AlreadyBlocked()
```

---

---

## AlreadyUnblocked

```solidity
error AlreadyUnblocked()
```

---

---

## AlreadySet

```solidity
error AlreadySet()
```

---

---

## PostDoesNotExist

```solidity
error PostDoesNotExist()
```

---

---

## CommentDoesNotExist

```solidity
error CommentDoesNotExist()
```

---

---

## ReplyDoesNotExist

```solidity
error ReplyDoesNotExist()
```

---

---

## AlreadySubscribed

```solidity
error AlreadySubscribed()
```

---

---

## AlreadyUnSubscribed

```solidity
error AlreadyUnSubscribed()
```

---

---

## AlreadyLiked

```solidity
error AlreadyLiked()
```

---

---

## AlreadyUnLiked

```solidity
error AlreadyUnLiked()
```

---

---

# Mirror Contract Modifiers:

---

---

## onlyModerator

```solidity
modifier onlyModerator()
```

#### _Throws if the message sender is not a moderator._

---

## onlyJoined

```solidity
modifier onlyJoined(address _address)
```

_Throws if the message sender is not a joined user._

#### Parameters

| Name      | Type    | Description              |
| --------- | ------- | ------------------------ |
| \_address | address | The address of the user. |

---

---

## onlyNotBanned

```solidity
modifier onlyNotBanned(address _address)
```

_Throws if the message sender is banned._

#### Parameters

| Name      | Type    | Description              |
| --------- | ------- | ------------------------ |
| \_address | address | The address of the user. |

---

---

## onlyExistingPost

```solidity
modifier onlyExistingPost(uint256 _videoId)
```

_Throws if the video post does not exist._

#### Parameters

| Name      | Type    | Description          |
| --------- | ------- | -------------------- |
| \_videoId | uint256 | The ID of the video. |

---

---

## onlyExistingComment

```solidity
modifier onlyExistingComment(uint256 _videoId, uint256 _commentId)
```

_Throws if the comment does not exist._

#### Parameters

| Name        | Type    | Description            |
| ----------- | ------- | ---------------------- |
| \_videoId   | uint256 | The ID of the video.   |
| \_commentId | uint256 | The ID of the comment. |

---

---

# Mirror Contract Functions:

---

---

## join

```solidity
function join() external
```

\_Allows a user to join the platform and become a member.
Emits a `UserJoined` event upon success.
Requirements:

-   The caller must not be banned.
-   The caller must not have already joined.\_

---

---

## updateProfile

```solidity
function updateProfile(string _username, string _imageHash, string _bannerHash, string _aboutHash) external
```

\_Allows a user to update their profile with a new username, image hash, banner hash, and about hash.
Emits a `UserUpdated` event upon success.
Requirements:

-   The caller must have already joined.
-   The provided data must not be empty.\_

### Parameters

| Name         | Type   | Description                                    |
| ------------ | ------ | ---------------------------------------------- |
| \_username   | string | The new username of the user.                  |
| \_imageHash  | string | The new IPFS hash of the user's profile image. |
| \_bannerHash | string | The new IPFS hash of the user's banner image.  |
| \_aboutHash  | string | The new IPFS hash of the user's about section. |

---

---

## deleteUser

```solidity
function deleteUser() external
```

\_Allows a user to delete their account and become deleted.
Emits a `UserDeleted` event upon success.
Requirements:

-   The caller must have already joined.\_

---

---

## uploadVideo

```solidity
function uploadVideo(string _videoHash, string _title, string _descriptionHash, string _thumbnailHash) external
```

_Uploads a video_

### Parameters

| Name              | Type   | Description                  |
| ----------------- | ------ | ---------------------------- |
| \_videoHash       | string | The IPFS hash of the video   |
| \_title           | string | The title of the video       |
| \_descriptionHash | string | The description hash of the video |
| \_thumbnailHash   | string | The thumbnail hash of the video   |

---

---

## updateVideo

```solidity
function updateVideo(uint256 _videoId, string _title, string _descriptionHash, string _thumbnailHash) external
```

_Updates a video_

### Parameters

| Name              | Type    | Description                            |
| ----------------- | ------- | -------------------------------------- |
| \_videoId         | uint256 | The ID of the video to update          |
| \_title           | string  | The title of the video to update       |
| \_descriptionHash | string  | The description hash of the video to update |
| \_thumbnailHash   | string  | The thumbnail hash of the video to update   |

---

---

## deleteVideo

```solidity
function deleteVideo(uint256 _videoId) external
```

_Deletes a video_

### Parameters

| Name      | Type    | Description                   |
| --------- | ------- | ----------------------------- |
| \_videoId | uint256 | The ID of the video to unlike |

---

---

## likeVideo

```solidity
function likeVideo(uint256 _videoId) external
```

_Like a video_

### Parameters

| Name      | Type    | Description                 |
| --------- | ------- | --------------------------- |
| \_videoId | uint256 | The ID of the video to like |

---

---

## unlikeVideo

```solidity
function unlikeVideo(uint256 _videoId) external
```

_Unlike a video_

### Parameters

| Name      | Type    | Description                   |
| --------- | ------- | ----------------------------- |
| \_videoId | uint256 | The ID of the video to unlike |

---

---

## subscribe

```solidity
function subscribe(address _subTo) external
```

_Allows a user to subscribe to a channel._

### Parameters

| Name    | Type    | Description                                     |
| ------- | ------- | ----------------------------------------------- |
| \_subTo | address | The address of the channel being subscribed to. |

---

---

## unsubscribe

```solidity
function unsubscribe(address _unsubTo) external
```

_Allows a user to unsubscribe from a channel._

### Parameters

| Name      | Type    | Description                                         |
| --------- | ------- | --------------------------------------------------- |
| \_unsubTo | address | The address of the channel being unsubscribed from. |

---

---

## addComment

```solidity
function addComment(uint256 _videoId, string _content) external
```

_Adds a comment to a video._

### Parameters

| Name      | Type    | Description                             |
| --------- | ------- | --------------------------------------- |
| \_videoId | uint256 | The ID of the video being commented on. |
| \_content | string  | The content of the comment.             |

---

---

## deleteComment

```solidity
function deleteComment(uint256 _videoId, uint256 _commentId) external
```

_Deletes a comment from a video._

### Parameters

| Name        | Type    | Description                            |
| ----------- | ------- | -------------------------------------- |
| \_videoId   | uint256 | The ID of the video the comment is on. |
| \_commentId | uint256 | The ID of the comment being deleted.   |

---

---

## addReply

```solidity
function addReply(uint256 _videoId, uint256 _commentId, string _content) external
```

_Adds a reply to a comment on a video._

### Parameters

| Name        | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| \_videoId   | uint256 | The ID of the video the comment is on.  |
| \_commentId | uint256 | The ID of the comment being replied to. |
| \_content   | string  | The content of the reply.               |

---

---

## deleteReply

```solidity
function deleteReply(uint256 _videoId, uint256 _commentId, uint256 _replyId) external
```

_Deletes a reply to a comment on a video._

### Parameters

| Name        | Type    | Description                            |
| ----------- | ------- | -------------------------------------- |
| \_videoId   | uint256 | The ID of the video the comment is on. |
| \_commentId | uint256 | The ID of the comment the reply is on. |
| \_replyId   | uint256 | The ID of the reply being deleted.     |

---

---

## setIsModerator

```solidity
function setIsModerator(address _address, bool _value) external
```

_Sets the moderator status of a user._

### Parameters

| Name      | Type    | Description                             |
| --------- | ------- | --------------------------------------- |
| \_address | address | The address of the user being modified. |
| \_value   | bool    | The new value of the moderator status.  |

---

---

## setIsVerified

```solidity
function setIsVerified(address _address, bool _value) external
```

Sets the verification status of a user

### Parameters

| Name      | Type    | Description                                                |
| --------- | ------- | ---------------------------------------------------------- |
| \_address | address | The address of the user to set the verification status for |
| \_value   | bool    | The verification status to set for the user                |

---

---

## setIsBanned

```solidity
function setIsBanned(address _address, bool _value) external
```

Sets the banned status of a user

### Parameters

| Name      | Type    | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| \_address | address | The address of the user to set the banned status for |
| \_value   | bool    | The banned status to set for the user                |

---

---

## setIsBlocked

```solidity
function setIsBlocked(uint256 _videoId, bool _value) external
```

Sets the blocked status of a video

### Parameters

| Name      | Type    | Description                                       |
| --------- | ------- | ------------------------------------------------- |
| \_videoId | uint256 | The ID of the video to set the blocked status for |
| \_value   | bool    | The blocked status to set for the video           |

---

---

## setSubscriptionRanks

```solidity
function setSubscriptionRanks(uint256 _whiteLabel, uint256 _silverLabel, uint256 _goldLabel, uint256 _platinumLabel) external
```

Sets the subscription ranks for the platform

### Parameters

| Name            | Type    | Description                                                    |
| --------------- | ------- | -------------------------------------------------------------- |
| \_whiteLabel    | uint256 | The number of subscribers required for the White Label rank    |
| \_silverLabel   | uint256 | The number of subscribers required for the Silver Label rank   |
| \_goldLabel     | uint256 | The number of subscribers required for the Gold Label rank     |
| \_platinumLabel | uint256 | The number of subscribers required for the Platinum Label rank |

---

---

## getSubscriptionRank

```solidity
function getSubscriptionRank(address _userAddress) external view returns (enum Mirror.SubscriptionLabel)
```

Gets the subscription rank of a user

### Parameters

| Name          | Type    | Description                                              |
| ------------- | ------- | -------------------------------------------------------- |
| \_userAddress | address | The address of the user to get the subscription rank for |

### Return Values

| Name | Type                          | Description                        |
| ---- | ----------------------------- | ---------------------------------- |
| [0]  | enum Mirror.SubscriptionLabel | The subscription label of the user |

---

---

## reportVideo

```solidity
function reportVideo(uint256 _videoId) external
```

Reports a video for inappropriate content

### Parameters

| Name      | Type    | Description                   |
| --------- | ------- | ----------------------------- |
| \_videoId | uint256 | The ID of the video to report |

---

---

## getVideosLength

```solidity
function getVideosLength(address _userAddress) external view returns (uint256)
```

Gets the number of videos a user has uploaded

### Parameters

| Name          | Type    | Description                                             |
| ------------- | ------- | ------------------------------------------------------- |
| \_userAddress | address | The address of the user to get the number of videos for |

### Return Values

| Name | Type    | Description                                |
| ---- | ------- | ------------------------------------------ |
| [0]  | uint256 | The number of videos the user has uploaded |

---

---

## getVideos

```solidity
function getVideos(address _userAddress, uint256 _startIndex, uint256 _endIndex) external view returns (uint256[])
```

Gets a range of videos uploaded by a user

### Parameters

| Name          | Type    | Description                                   |
| ------------- | ------- | --------------------------------------------- |
| \_userAddress | address | The address of the user to get the videos for |
| \_startIndex  | uint256 | The index of the first video to get           |
| \_endIndex    | uint256 | The index of the last video to get            |

### Return Values

| Name | Type      | Description           |
| ---- | --------- | --------------------- |
| [0]  | uint256[] | An array of video IDs |

---

---

## getSubscribersLength

```solidity
function getSubscribersLength(address _userAddress) external view returns (uint256)
```

Gets the number of subscribers a user has

### Parameters

| Name          | Type    | Description                                                  |
| ------------- | ------- | ------------------------------------------------------------ |
| \_userAddress | address | The address of the user to get the number of subscribers for |

---

---

### Return Values

| Name | Type    | Description                            |
| ---- | ------- | -------------------------------------- |
| [0]  | uint256 | The number of subscribers the user has |

---

---

## getSubscribers

```solidity
function getSubscribers(address _userAddress, uint256 _startIndex, uint256 _endIndex) external view returns (address[])
```

Gets a range of subscribers for a user

### Parameters

| Name          | Type    | Description                                        |
| ------------- | ------- | -------------------------------------------------- |
| \_userAddress | address | The address of the user to get the subscribers for |
| \_startIndex  | uint256 | The index of the first subscriber to get           |
| \_endIndex    | uint256 | The index of the last subscriber to get            |

### Return Values

| Name | Type      | Description                      |
| ---- | --------- | -------------------------------- |
| [0]  | address[] | An array of subscriber addresses |

---

---

## getSubscriptionsLength

```solidity
function getSubscriptionsLength(address _userAddress) external view returns (uint256)
```

Gets the number of subscriptions a user has

### Parameters

| Name          | Type    | Description                                                    |
| ------------- | ------- | -------------------------------------------------------------- |
| \_userAddress | address | The address of the user to get the number of subscriptions for |

### Return Values

| Name | Type    | Description                              |
| ---- | ------- | ---------------------------------------- |
| [0]  | uint256 | The number of subscriptions the user has |

---

---

## getSubscriptions

```solidity
function getSubscriptions(address _userAddress, uint256 _startIndex, uint256 _endIndex) external view returns (address[])
```

Gets a range of subscriptions for a user

### Parameters

| Name          | Type    | Description                                          |
| ------------- | ------- | ---------------------------------------------------- |
| \_userAddress | address | The address of the user to get the subscriptions for |
| \_startIndex  | uint256 | The index of the first subscriptions to get          |
| \_endIndex    | uint256 | The index of the last subscriptions to get           |

### Return Values

| Name | Type      | Description                         |
| ---- | --------- | ----------------------------------- |
| [0]  | address[] | An array of subscriptions addresses |

---

---

## isSubscribed

```solidity
function isSubscribed(address _userAddress, address _subTo) external view returns (bool)
```

_Returns whether the given user address is subscribed to the given subscription address._

### Parameters

| Name          | Type    | Description                                   |
| ------------- | ------- | --------------------------------------------- |
| \_userAddress | address | The address of the user to check.             |
| \_subTo       | address | The address of the subscription to check for. |

### Return Values

| Name | Type | Description                                                                    |
| ---- | ---- | ------------------------------------------------------------------------------ |
| [0]  | bool | A boolean indicating whether the user is subscribed to the given subscription. |

---

---

## getLikedLength

```solidity
function getLikedLength(address _userAddress) external view returns (uint256)
```

_Returns the length of the liked videos array of a user_

### Parameters

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| \_userAddress | address | The user's address |

### Return Values

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| [0]  | uint256 | The length of the user's liked videos array |

---

---

## getLiked

```solidity
function getLiked(address _userAddress, uint256 _startIndex, uint256 _endIndex) external view returns (uint256[])
```

_Returns an array of the video IDs that a user has liked_

### Parameters

| Name          | Type    | Description                                              |
| ------------- | ------- | -------------------------------------------------------- |
| \_userAddress | address | The user's address                                       |
| \_startIndex  | uint256 | The start index of the range of liked videos to retrieve |
| \_endIndex    | uint256 | The end index of the range of liked videos to retrieve   |

### Return Values

| Name | Type      | Description                                       |
| ---- | --------- | ------------------------------------------------- |
| [0]  | uint256[] | An array of the video IDs that the user has liked |

---

---

## isLiked

```solidity
function isLiked(address _userAddress, uint256 _videoId) external view returns (bool)
```

_Returns whether the given user address has liked the given video ID._

### Parameters

| Name          | Type    | Description                              |
| ------------- | ------- | ---------------------------------------- |
| \_userAddress | address | The address of the user to check.        |
| \_videoId     | uint256 | The ID of the video to check for a like. |

### Return Values

| Name | Type | Description                                                      |
| ---- | ---- | ---------------------------------------------------------------- |
| [0]  | bool | A boolean indicating whether the user has liked the given video. |

---

---

## getCommentsLength

```solidity
function getCommentsLength(uint256 _videoId) external view returns (uint256)
```

_Returns the length of the 'comments' array for the given video ID._

### Parameters

| Name      | Type    | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| \_videoId | uint256 | The ID of the video whose 'comments' array length to return. |

### Return Values

| Name | Type    | Description                         |
| ---- | ------- | ----------------------------------- |
| [0]  | uint256 | The length of the 'comments' array. |

---

---

## getComments

```solidity
function getComments(uint256 _videoId, uint256 _startIndex, uint256 _endIndex) external view returns (struct Mirror.Comment[])
```

If \_startIndex and \_endIndex are both zero, returns the entire comments array for the specified video ID.
Throws an error if the \_endIndex is less than or equal to \_startIndex, or if the \_endIndex is greater than the length of the comments array.

_Returns an array of comments for a given video ID within a specified range of indices._

### Parameters

| Name         | Type    | Description                                         |
| ------------ | ------- | --------------------------------------------------- |
| \_videoId    | uint256 | The ID of the video to retrieve comments for.       |
| \_startIndex | uint256 | The starting index of the comments array to return. |
| \_endIndex   | uint256 | The ending index of the comments array to return.   |

### Return Values

| Name | Type                    | Description                                                                        |
| ---- | ----------------------- | ---------------------------------------------------------------------------------- |
| [0]  | struct Mirror.Comment[] | An array of comments for the specified video ID within the given range of indices. |

---

---

## getRepliesLength

```solidity
function getRepliesLength(uint256 _videoId, uint256 _commentId) external view returns (uint256)
```

_Returns the number of replies for a given comment ID within a given video ID._

### Parameters

| Name        | Type    | Description                                                         |
| ----------- | ------- | ------------------------------------------------------------------- |
| \_videoId   | uint256 | The ID of the video containing the comment to retrieve replies for. |
| \_commentId | uint256 | The ID of the comment to retrieve replies for.                      |

### Return Values

| Name | Type    | Description                                                                   |
| ---- | ------- | ----------------------------------------------------------------------------- |
| [0]  | uint256 | The number of replies for the specified comment ID within the given video ID. |

---

---

## getReplies

```solidity
function getReplies(uint256 _videoId, uint256 _commentId, uint256 _startIndex, uint256 _endIndex) external view returns (struct Mirror.Reply[])
```

_Retrieves a range of replies to a comment on a video._

### Parameters

| Name         | Type    | Description                                    |
| ------------ | ------- | ---------------------------------------------- |
| \_videoId    | uint256 | The ID of the video containing the comment.    |
| \_commentId  | uint256 | The ID of the comment to retrieve replies for. |
| \_startIndex | uint256 | The index of the first reply to retrieve.      |
| \_endIndex   | uint256 | The index of the last reply to retrieve.       |

### Return Values

| Name | Type                  | Description                                                   |
| ---- | --------------------- | ------------------------------------------------------------- |
| [0]  | struct Mirror.Reply[] | An array of Reply objects representing the requested replies. |

---

---

## inherits Ownable:

---

---

## owner

```solidity
function owner() public view virtual returns (address)
```

## _Returns the address of the current owner._

---

## \_checkOwner

```solidity
function _checkOwner() internal view virtual
```

## _Throws if the sender is not the owner._

---

## renounceOwnership

```solidity
function renounceOwnership() public virtual
```

\_Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.

NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.\_

---

---

## transferOwnership

```solidity
function transferOwnership(address newOwner) public virtual
```

_Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner._

---

---

## \_transferOwnership

```solidity
function _transferOwnership(address newOwner) internal virtual
```

_Transfers ownership of the contract to a new account (`newOwner`).
Internal function without access restriction._

---

---

# Events:

---

---

## UserJoined

```solidity
event UserJoined(address userAddress)
```

---

---

## UserUpdated

```solidity
event UserUpdated(address userAddress, string username, string imageHash, string bannerHash, string aboutHash)
```

---

---

## UserDeleted

```solidity
event UserDeleted(address userAddress)
```

---

---

## VideoUploaded

```solidity
event VideoUploaded(uint256 videoId, address author, string title, string descriptionHash, string thumbnailHash)
```

---

---

## VideoUpdated

```solidity
event VideoUpdated(uint256 videoId, address author, string title, string descriptionHash, string thumbnailHash)
```

---

---

## VideoDeleted

```solidity
event VideoDeleted(uint256 videoId, address author)
```

---

---

## Liked

```solidity
event Liked(uint256 videoId, address user)
```

---

---

## UnLiked

```solidity
event UnLiked(uint256 videoId, address user)
```

---

---

## Subscribed

```solidity
event Subscribed(address subscriber, address subscribedTo)
```

---

---

## UnSubscribed

```solidity
event UnSubscribed(address subscriber, address subscribedTo)
```

---

---

## CommentAdded

```solidity
event CommentAdded(uint256 videoId, uint256 commentId, address user, string content)
```

---

---

## CommentDeleted

```solidity
event CommentDeleted(uint256 videoId, uint256 commentId, address user)
```

---

---

## ReplyAdded

```solidity
event ReplyAdded(uint256 videoId, uint256 commentId, uint256 replyId, address user, string content)
```

---

---

## ReplyDeleted

```solidity
event ReplyDeleted(uint256 videoId, uint256 commentId, uint256 replyId, address user)
```

---

---

## IsModeratorSet

```solidity
event IsModeratorSet(address userAddress, bool value)
```

---

---

## IsVerifiedSet

```solidity
event IsVerifiedSet(address userAddress, bool value)
```

---

---

## IsBlockedSet

```solidity
event IsBlockedSet(uint256 videoId, bool value)
```

---

---

## IsBannedSet

```solidity
event IsBannedSet(address userAddress, bool value)
```

---

---

## SubscriptionRanksSet

```solidity
event SubscriptionRanksSet(uint256 whiteLabel, uint256 silverLabel, uint256 goldLabel, uint256 platinumLabel)
```

---

---

## Reported

```solidity
event Reported(uint256 videoId, address reporter)
```

---

---

## inherits Ownable:

---

---

## OwnershipTransferred

```solidity
event OwnershipTransferred(address previousOwner, address newOwner)
```

---

---

## If you want to deploy to a testnet or mainnet:

---

---

### 5. Add a `.env` file with the same contents of `.env.example`, but replaced with your variables.

![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+) **WARNING** ![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+)

> DO NOT PUSH YOUR PRIVATE_KEY TO GITHUB

---

---
