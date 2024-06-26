import React from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useMediaQuery } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/action/userAction';

const Sidebar = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    console.log('=======================================================================');
    const isSmallScreen = useMediaQuery('(max-width: 868px)');
    const handleLogout=async()=>{
        dispatch(logout())
        navigate('/')
    }
    return (
        <Card className={`p-4 ${isSmallScreen ? 'fixed bottom-0 left-0 right-0 w-full ' : 'h-screen md:max-w-[20rem] w-60 shadow-blue-gray-900/5 shadow-xl '} `}>
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                {isSmallScreen ? null : ' E-tutor Admin'}
                </Typography>
            </div>
            <List className={`md:flex ${isSmallScreen ? 'flex-row justify-between' : 'flex-col gap-4'}`}>
               <Link to='/admin/dashboard'>
                <ListItem>
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {isSmallScreen ? null : 'Dashboard'}
                </ListItem>
                </Link>
               <Link to='/admin/categories'>
                 <ListItem>
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {isSmallScreen ? null : 'Categories'}
                </ListItem>
                </Link>
                   <Link to='/admin/requests'> 
                <ListItem>
                   <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {isSmallScreen ? null : 'Requests'}
                    <ListItemSuffix>
                    </ListItemSuffix>
                </ListItem>
                    </Link>
                    <Link to='/admin/instrutors'>
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {isSmallScreen ? null : 'Instructors'}
                </ListItem>
                </Link>
                <Link to='/admin/courses'>
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {isSmallScreen ? null : 'Courses'}
                </ListItem>
                </Link>
                <ListItem onClick={handleLogout}>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {isSmallScreen ? null : 'Log Out'}
                </ListItem>
            </List>
        </Card>
    );
};

export default Sidebar;
