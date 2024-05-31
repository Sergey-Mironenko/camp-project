import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import todoSerivce from '~shared/services/todo.service';
import { useTodoStore } from '~store/todo.store';

import {
  todoListStyles, titleStyles, addButtonStyles, addFormStyles,
  tableStyles, tableHeadStyles, rowStyles,
} from './todoList.styles';
import { sliderPhone, swiper, slide, swiperContainer, sliderButton} from './todoListGadget.styles';
import classNames from 'classnames';

import TodoPhoneCard from '../todoPhone/todoPhone.component';
import TodoTabletCard from '../todoTablet/todoTablet.component';
import TodoDesctopCard from '../todoDesctop/todoDesctop.component';

import FormField from '../field/field.component';
import { addState } from '../../utils/formStates';

import { useUsersStore } from '~store/user.store';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
}

const TodoList: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const user = useUsersStore(state => state.user);
  const [editingTodoId, setEditingTodoId] = React.useState<string | null>(null);
  const [isAddingTodo, setIsAddingTodo] = React.useState<boolean>(false);
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const updateTodo = useTodoStore(state => state.updateTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const sliderRef = React.useRef(null);

  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleAdd = async(title: string, isCompleted: boolean, isPrivate: boolean) => {
    setIsLoading(true);

    try {
      const response = await todoSerivce.createTodo({
        title,
        userId: 'userId',
        userName: 'userName',
        isCompleted,
        isPrivate,
      });

      addTodo(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsAddingTodo(false);
      setIsLoading(false);
    } 
  };

  const handleUpdate = async(values: {id: string, title: string, isCompleted: boolean, isDeleted: boolean}) => {
    const { id, title, isCompleted, isDeleted } = values;
    
    setIsLoading(true);

    try {
      if (!isDeleted) {
        const response = await todoSerivce.updateTodo({ id, title, isCompleted });

        updateTodo(response.data);
      } else {
        await todoSerivce.deleteTodo({ id });

        deleteTodo(id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditingTodoId(null);
      setIsLoading(false);
    } 
  };

  return (
	<div className={classNames(
      todoListStyles()
    )}>
      <h1 className={classNames(
        titleStyles(onPhone)
      )}>
        {`${user.name}'s todos`}
      </h1>

      {isAddingTodo ? (
        <Formik
          initialValues={addState}
          onSubmit={values => {
            handleAdd(values.title, values.completed, values.private)
          }}
        >
          {({ errors, touched }) => (
            <Form className={classNames(
              addFormStyles(onPhone, (onTablet && !onPhone), (errors.title && touched.title) && true)
            )}>
              <div>
                <label>Title:</label>
                <div>
                  <FormField
                    name="text"
                    type="title"
                    errors={errors}
                  />
                </div>
              </div>
  
              <div>
                <div>
                  <label>Completed:</label>
                  <FormField
                    name="completed"
                    type="checkbox"
                    errors={errors}
                  />
                </div>
                <div>
                  <label>Private:</label>
                  <FormField
                    name="private"
                    type="checkbox"
                    errors={errors}
                  />
                </div>
              </div>
  
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      ) : (
        <button
          className={classNames(
            addButtonStyles(onPhone, (onTablet && !onPhone))
          )}
          type="button"
          onClick={() => setIsAddingTodo(true)}
        >
          Lets add something to do?
        </button>
      )}

      {(onTablet && onPhone) && (
        <div className={classNames(
          sliderPhone()
        )}>
          {todos.map(todo => (
            <TodoPhoneCard
              onTablet={onTablet}
              onPhone={onPhone}
              todo={todo}
              editingTodoId={editingTodoId}
              setEditingTodoId={setEditingTodoId}
              handleUpdate={handleUpdate}
              key={todo.id}
            />
          ))}
        </div>
      )}

      {(onTablet && !onPhone) && (
        <div className={classNames(
          swiperContainer()
        )}>
          <button
            className={classNames(
              sliderButton(),
            )}
            onClick={handlePrev}
          >
            {'<'}
          </button>

          <Swiper
            className={classNames(
              swiper()
            )}
            spaceBetween={0}
            slidesPerView={1}
            ref={sliderRef}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            
            {todos.map(todo => (
              <SwiperSlide key={todo.id} className={classNames(
                slide()
              )}>
                <TodoTabletCard
                  onTablet={onTablet}
                  onPhone={onPhone}
                  todo={todo}
                  editingTodoId={editingTodoId}
                  setEditingTodoId={setEditingTodoId}
                  handleUpdate={handleUpdate}
                  key={todo.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={classNames(
              sliderButton(),
            )}
            onClick={handleNext}
          >
          {'>'}
          </button>
        </div>
      )}

      {(!onPhone && !onTablet) && (
        <table className={classNames(
          tableStyles()
        )}>
          <thead className={classNames(
            tableHeadStyles()
          )}>
            <tr className={classNames(
              rowStyles()
            )}>
              <th>Name</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Private</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <TodoDesctopCard
                todo={todo}
                editingTodoId={editingTodoId}
                setEditingTodoId={setEditingTodoId}
                handleUpdate={handleUpdate}
                key={todo.id}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoList;
