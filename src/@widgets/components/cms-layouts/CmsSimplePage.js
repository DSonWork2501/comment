import FusePageSimple from '@fuse/core/FusePageSimple';
import Icon from '@material-ui/core/Icon';
import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';

/**
 * @description Layout SimplePage cho nội dung của trang
 * @param icon string,
 * @param title string
 * @param subTitle string
 * @param toolbar node
 * @param content node
 * @param lsHeader node
 * @param lsContent node
 * @param rsHeader node
 * @param rsContent node
 * @param selectedAction node
 * @param selectedInfo node
 */
function SimplePage(props) {
	const { icon, header, toolbar, content, lsHeader, lsContent, rsHeader, rsContent } = props;
	const pageLayout = useRef(null);

	return (
		<FusePageSimple
			classes={{
				content: 'flex'
			}}
			header={
				<div className="flex flex-col flex-1">
					<div className="flex items-center p-24 px-12">
						<div className="flex items-center">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon className="text-18">{icon}</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									{header}
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			}
			contentToolbar={toolbar}
			content={content}
			leftSidebarHeader={lsHeader}
			leftSidebarContent={lsContent}
			rightSidebarHeader={rsHeader}
			rightSidebarContent={rsContent}
			ref={pageLayout}
			innerScroll
			sidebarInner
		/>
	);
}

SimplePage.propTypes = {
	icon: PropTypes.string,
	header: PropTypes.string,
	toolbar: PropTypes.node,
	content: PropTypes.node,
	lsHeader: PropTypes.node,
	lsContent: PropTypes.node,
	rsHeader: PropTypes.node,
	rsContent: PropTypes.node
}

SimplePage.defaultProps = {
	icon: null,
	header: "",
	toolbar: null,
	content: null,
	lsHeader: null,
	lsContent: null,
	rsHeader: null,
	rsContent: null
}

export default SimplePage;
