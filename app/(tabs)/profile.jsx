import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import CustomButton from '../../components/CustomButton';
import {getCurrentUser, testGetUser, testRemoveUser} from '../../lib/manageUser';


const Profile = () => {
  return (
    <View>
      <CustomButton
            title="delete"
            handlePress={testRemoveUser}
            containerStyles="w-full mt-7" 
          />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})