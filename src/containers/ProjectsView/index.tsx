import React, { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated, config, easings, Controller } from 'react-spring';
import { useDrag, useGesture, useWheel } from '@use-gesture/react';
import { clamp } from 'lodash';
import swap from 'lodash-move';


import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Project from '../Project';

import Tree from 'store/tree';
import classNames from 'classnames';
import { observer } from 'mobx-react';

const tree = new Tree();


const tabSpace = 238;

const prevent = ( e ) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

const Tab = observer( ( { project, onClose, onChangeOrder, totalTabsCount, active = false, index, styles = {}, ...props } ) => {
  const tabRef = useRef( null );
  const targetIndex = useRef( index );
  // const [targetIndex, setTargetIndex] = useState( index );
  const left = useRef( index * tabSpace );

  // const x = index * tabSpace;

  const [springStyles, api] = useSpring( () => ( { x: index * tabSpace, config: config.stiff } ) );

  useEffect( () => {
    if ( index !== targetIndex.current ) {
      // api.stop();
      api.start( { x: index * tabSpace, immediate: false, config: config.stiff } );
      // console.log( `Update for (${ index }) has been run` );
      targetIndex.current = index;
    }
  }, [api, index] );

  const bind = useGesture( {
    onDrag: ( { active: dragActive, first, last, target, movement: [mx], velocity: [vx] } ) => {
      // if (!active) {
      //   return false;
      // }
      if ( first ) {
        console.log( `Drag for (${ index }) has been run` );
      }

      if ( first ) {
        // activeIndex.current = index;
        left.current = targetIndex.current * tabSpace;
      }

      if ( last ) {
        const nextIndex = clamp(
          Math.round( ( left.current + mx ) / tabSpace ),
          0,
          totalTabsCount - 1
        );

        left.current = nextIndex * tabSpace;
        api.start( { x: left.current, immediate: false, config: config.stiff } );
      } else {
        api.start( () => {


          const pos = dragActive ? ( left.current + mx ) : left.current;

          if ( dragActive ) {
            const nextIndex = clamp(
              Math.round( ( left.current + mx ) / tabSpace ),
              0,
              totalTabsCount - 1
            );

            if ( nextIndex !== targetIndex.current && dragActive ) {
              onChangeOrder( targetIndex.current, nextIndex );
              // activeIndex.current = nextIndex;
              targetIndex.current = nextIndex;
            }
          }

          // console.log( tabRef.current.parentNode.parentNode.scrollLeft, pos );
          /*
          const listScrollNode = tabRef.current.parentNode.parentNode;
          const listScrollLeft = listScrollNode.scrollLeft;
          const listScrollWidth = listScrollNode.scrollLeft + listScrollNode.offsetWidth;// listScrollNode.scrollWidth - listScrollNode.offsetWidth;
          if ( pos < listScrollLeft ) {
            listScrollNode.scrollTo( {
              top: 0,
              left: listScrollLeft - 1,
              behaviour: 'instant'
              // behaviour: 'smooth' // if you want smooth scrolling
            } );
          } else if ( ( pos + tabSpace ) > listScrollWidth ) {

            listScrollNode.scrollTo( {
              top: 0,
              left: listScrollLeft + 1,
              behaviour: 'instant'
              // behaviour: 'smooth' // if you want smooth scrolling
            } );
          }
          */

          return { x: pos, immediate: true, config: config.stiff };
        } );
      }

    }
  }, { drag: { pointer: { capture: false } } } );

  const className = classNames( {
    active,
    'chrome-tab': true
  } );

  return (
    <animated.div
      className={ className }
      style={ { width: 258, ...styles, ...springStyles } }
      { ...props }
      ref={ tabRef }
    >
      <div className='chrome-tab-dividers'></div>
      <div className='chrome-tab-background'>
        <svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <symbol id='chrome-tab-geometry-left' viewBox='0 0 214 36'>
              <path d='M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z'></path>
            </symbol>
            <symbol id='chrome-tab-geometry-right' viewBox='0 0 214 36'>
              <use xlinkHref='#chrome-tab-geometry-left'></use>
            </symbol>
            <clipPath id='crop'>
              <rect className='mask' width='100%' height='100%' x='0'></rect>
            </clipPath>
          </defs>
          <svg width='52%' height='100%'>
            <use xlinkHref='#chrome-tab-geometry-left' width='214' height='36' className='chrome-tab-geometry'/>
          </svg>
          <g transform='scale(-1, 1)'>
            <svg width='52%' height='100%' x='-100%' y='0'>
              <use xlinkHref='#chrome-tab-geometry-right' width='214' height='36' className='chrome-tab-geometry'/>
            </svg>
          </g>
        </svg>
      </div>
      <div className='chrome-tab-content'>
        <div className='chrome-tab-title'>{project.name || 'Empty'}</div>
        <div className='chrome-tab-drag-handle' { ...bind() }></div>
        <div className='chrome-tab-close'>
          <IconButton aria-label='close' size='small' onClick={ onClose } onMouseDown={ prevent }>
            <CloseIcon fontSize='inherit'/>
          </IconButton>
        </div>
      </div>
    </animated.div>
  );
} );


const Tabs = observer( ( { env } ) => {
  const tabsContainerRef = useRef( null );

  // console.log( tabsContainerRef );

  const onScrollUpdate = useCallback( ( value ) => {
    tabsContainerRef.current.scrollTo( {
      top: 0,
      left: value,
      behaviour: 'instant'
      // behaviour: 'smooth' // if you want smooth scrolling
    } );
  }, [] );

  const animator = useRef( new Controller( {
    x: 0,
    onChange: { x: onScrollUpdate }
  } ) );

  // console.log( animator );

  const onChangeOrder = useCallback( ( index, next ) => {
    // console.log( index, next );
    const nextOrder = swap( env.openedProjects, index, next );
    env.setOpenedProjects( nextOrder );
  }, [env] );

  const bindWheel = useWheel( ( { delta: [dx, dy] } ) => {
    // scrollWidth - offsetWidth
    const scrollX = clamp(
      tabsContainerRef.current.scrollLeft + dy,
      0,
      tabsContainerRef.current.scrollWidth - tabsContainerRef.current.offsetWidth
    );
    // tabsContainerRef.current.scrollTo( {
    //   top: 0,
    //   left: scrollX,
    //   behaviour: 'instant'
    //   // behaviour: 'smooth' // if you want smooth scrolling
    // } );
    animator.current.start( { from: { x: tabsContainerRef.current.scrollLeft }, to: { x: scrollX }, config: { duration: 200, easing: easings.easeOutQuad } } );

    // tabsContainerRef.current.scrollTo( {
    //   top: 0,
    //   left: tabsContainerRef.current.scrollLeft + dy,
    //   behaviour: 'smooth' // if you want smooth scrolling
    // } );
  } );

  return (
    <div
      className='projects-view__tabs'
      ref={ tabsContainerRef }
      { ...bindWheel() }
    >
      <div
        style={ { width: Math.max( 1, env.openedProjects.length ) * tabSpace + 20 } }
      >
        {
          env.openedProjects.map( ( project, i ) => {
            const onClose = ( e ) => env.close( project );

            return (
              <Tab
                active={ project.id === env.targetProject.id }
                project={ project }
                // id={ project.id }
                // + orderArray.indexOf( project.id )
                key={ project.id }
                // orderArray={ orderArray }
                onMouseDown={ ( e ) => env.setTargetProject( project ) }
                onChangeOrder = { onChangeOrder }
                onClose = { onClose }
                index={ i }
                totalTabsCount={ env.openedProjects.length }
              />
            );
          } )
        }
      </div>
    </div>
  );
} );

// 238 - tab space
const ProjectsView = observer( ( { env } ) => {

  return (
    <div className='projects-view'>
      <Tabs
        env={ env }
      />
      <div className='projects-view__views'>
        <Project tree={ tree } />
      </div>
    </div>
  );
} );

export default ProjectsView;
