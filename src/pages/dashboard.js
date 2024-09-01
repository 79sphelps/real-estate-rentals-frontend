import React, { useEffect } from "react";
import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";
import { Section, Summary } from "../components";
import BarGraph from "../helpers/graphs";
import { getRentals } from "../redux/actions";
// import { getAgentList } from "../redux/actions/agentsAction";
import { selectRentals } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const listProperties = useSelector(selectRentals);
  const properties = listProperties;
  // const { agents } = useSelector((state) => state.agentList);

  useEffect(() => {
    // dispatch(getAgentList());
    dispatch(getRentals())
  }, [dispatch]);

  return (
    <>
      <HeaderContainer />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <DashboardContainer title="Agency Summaries">
          {properties && Array.isArray(properties) ? (
            <>
            <Summary.Top>
              <Summary.Anchor to="/dashboard_properties" bg="var(--bs-teal)">
                <Summary.AnchorDiv>
                  <Summary.Title>{properties.length}</Summary.Title>
                  <Summary.Text>All Properties</Summary.Text>
                </Summary.AnchorDiv>
                <Summary.AnchorDiv>
                  <Summary.Icon name="fas fa-map-marker-alt" />
                </Summary.AnchorDiv>
              </Summary.Anchor>
              {/* <Summary.Anchor to="/dashboard_agents" bg="var(--bs-pink)">
                <Summary.AnchorDiv>
                  <Summary.Title>{agents.length}</Summary.Title>
                  <Summary.Text>All Agents</Summary.Text>
                </Summary.AnchorDiv>
                <Summary.AnchorDiv>
                  <Summary.Icon name="fas fa-users" />
                </Summary.AnchorDiv>
              </Summary.Anchor> */}
            </Summary.Top>
            <Summary.Bottom>
              <Summary.BottomHeader>
                <Summary.Title>Properties By Category</Summary.Title>
              </Summary.BottomHeader>
              <Summary.BottomContent>
                <BarGraph properties={properties} />
              </Summary.BottomContent>
            </Summary.Bottom>
            </>
          ) : null }
          </DashboardContainer>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default Dashboard;
