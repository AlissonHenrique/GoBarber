import styled from 'styled-components/native';

import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
`;
export const BackButton = styled.TouchableOpacity`
  margin-top: 32px;
  left: 24px;
  top: 64px;
`;
export const Title = styled.Text`
  font-size: 40px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;
export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;
export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;

  align-self: center;
`;
