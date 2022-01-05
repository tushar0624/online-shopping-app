import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { fetchCollectionStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

import { ShopPageCOntainer } from './shop.styles';

const CollectionOverviewContainer = lazy(() => import('../../components/collection-overview/collection-overview.container')) ;
const CollectionPageContainer = lazy(() => import('../collection/collection-container'));

const ShopPage = ({fetchCollectionsStart, match}) => {

  useEffect(() => {
    fetchCollectionsStart();
  },[fetchCollectionsStart])

  return (
    <ShopPageCOntainer>
      <Suspense fallback={ <Spinner/> }>
        <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </Suspense>
    </ShopPageCOntainer>
  )
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
