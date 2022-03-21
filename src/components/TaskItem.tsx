import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/editIcon.png';

export function TaskItem({toggleTaskDone, index, task, removeTask, editTask, item}: any){
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing(){
    setIsEditing(true);
  }

  function handleCancelEditing(){
    setEditedValue(editedValue);
    setIsEditing(false);
  }

  function handleSubmitEditing(){
    editTask(item.id, editedValue);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >

          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF" />
            )}
          </View>

          <TextInput
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={editedValue}
            onChangeText={setEditedValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          >
            {/* {item.title} */}
          </TextInput>

        </TouchableOpacity>
      </View>
      
      <View style={styles.iconsContainer}/>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2b2" />
          </TouchableOpacity>
        ) : (
        <TouchableOpacity
          onPress={handleStartEditing}
        >
          <Image source={editIcon} />
        </TouchableOpacity>
        )
        }
      
        <View style={styles.iconsDivider}/>

        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  infoContainer:{
    flex: 1,
  },

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems:'center',
    paddingLeft: 12,
    paddingRight: 24
  },
  iconsDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(196, 196, 196, 0.24 )',
    marginHorizontal: 8,
  }
})