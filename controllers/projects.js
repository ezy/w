const _ = require('lodash');
const moment = require('moment');

// Limit queries with a map
const queryFiltersMap = ['id', 'project', 'shot', 'version', 'status'];

const getAllProjects = (req, res) => {
  const projectStore = req.app.get('projectStore');
  let projects = [];
  const { query } = req;

  /**
   * Basic query filters. Matches map of values in queryFiltersMap
   */
  // ids are ints so we need to convert string for query
  if (query.id) query.id = parseInt(query.id, 10);
  // Pick only relevant keys from query
  const filterQuery = _.pick(query, queryFiltersMap);
  projects = _.filter(projectStore, filterQuery);

  /**
   * Sort by query. Format { sort_by: 'value'}
   * @return  {array}  returns sorted array
   */
  if (query.sort_by) projects = _.sortBy(projects, (project) => project[query.sort_by]);

  /**
   * Filter by query. Format { filter: 'oneFilter,twoFilter'}
   * @return  {[type]}  [return description]
   */
  if (query.filter) {
    projects = _.filter(projects, (project) => {
    // Set boolean false to return no values
      let boolean = false;
      _.each(project, (value) => {
      // set boolean true if filter string contains value
        if (query.filter.includes(value)) boolean = true;
      });
      return boolean;
    });
  }

  /**
   * Filter dates created after
   * @return  {array}  array of dates after query
   */
  if (query.created_after) {
    // eslint-disable-next-line max-len
    projects = _.filter(projects, (project) => moment(query.created_after).isAfter(project.created_date));
  }

  /**
   * API response
   */
  res.json({ projects });
};

module.exports = {
  getAllProjects
};
