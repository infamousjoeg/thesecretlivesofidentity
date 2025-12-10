import React from 'react';
import {
  Workload,
  SpireServer,
  SpireAgent,
  Badge,
  TrustBundle,
  TrustDomain,
  RegistrationEntry,
  Connection,
  Message,
  Attacker,
} from '@/components/entities';

/**
 * Development-only page for visual verification of entity components.
 * This page displays all entity components in isolation with multiple states.
 * Route: /dev/entities (only available in development mode)
 */
export const DevEntities: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-display font-bold text-textPrimary mb-2">
        Entity Component Showcase
      </h1>
      <p className="text-textSecondary mb-8">
        Visual verification page for all entity components. Each entity is shown in isolation with multiple states.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Workload - Unattested */}
        <EntityCard title="Workload (Unattested)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <Workload
              label="api-server"
              attested={false}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Workload - Attested */}
        <EntityCard title="Workload (Attested)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <Workload
              label="api-server"
              attested={true}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Workload - With Question Mark */}
        <EntityCard title="Workload (Unknown)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <Workload
              label="unknown-service"
              attested={false}
              showQuestionMark={true}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* SPIRE Server - Inactive */}
        <EntityCard title="SPIRE Server (Inactive)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <SpireServer
              label="SPIRE Server"
              active={false}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* SPIRE Server - Active */}
        <EntityCard title="SPIRE Server (Active)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <SpireServer
              label="SPIRE Server"
              active={true}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* SPIRE Agent - Inactive */}
        <EntityCard title="SPIRE Agent (Inactive)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <SpireAgent
              label="SPIRE Agent"
              active={false}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* SPIRE Agent - Active */}
        <EntityCard title="SPIRE Agent (Active)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <SpireAgent
              label="SPIRE Agent"
              active={true}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Badge - Valid */}
        <EntityCard title="Badge (Valid)" status="verified" critical>
          <svg viewBox="0 0 200 250" className="w-full h-48">
            <Badge
              spiffeId="spiffe://acme.com/web"
              state="valid"
              expiresIn={3600}
              showCountdown={true}
              position={{ x: 100, y: 125 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Badge - Expiring */}
        <EntityCard title="Badge (Expiring)" status="verified" critical>
          <svg viewBox="0 0 200 250" className="w-full h-48">
            <Badge
              spiffeId="spiffe://acme.com/api"
              state="expiring"
              expiresIn={120}
              showCountdown={true}
              position={{ x: 100, y: 125 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Badge - Expired */}
        <EntityCard title="Badge (Expired)" status="verified" critical>
          <svg viewBox="0 0 200 250" className="w-full h-48">
            <Badge
              spiffeId="spiffe://acme.com/old"
              state="expired"
              expiresIn={0}
              showCountdown={true}
              position={{ x: 100, y: 125 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Badge - JWT Variant */}
        <EntityCard title="Badge (JWT)" status="verified" critical>
          <svg viewBox="0 0 200 250" className="w-full h-48">
            <Badge
              spiffeId="spiffe://acme.com/jwt-svc"
              state="valid"
              variant="jwt"
              expiresIn={1800}
              showCountdown={true}
              position={{ x: 100, y: 125 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Trust Bundle */}
        <EntityCard title="Trust Bundle" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <TrustBundle
              label="Trust Bundle"
              certCount={3}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Trust Bundle - Expanded */}
        <EntityCard title="Trust Bundle (Expanded)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <TrustBundle
              label="Trust Bundle"
              certCount={5}
              expanded={true}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Trust Domain */}
        <EntityCard title="Trust Domain" status="verified">
          <svg viewBox="0 0 300 200" className="w-full h-40">
            <TrustDomain
              domain="acme.com"
              width={250}
              height={150}
              position={{ x: 150, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Registration Entry */}
        <EntityCard title="Registration Entry" status="verified">
          <svg viewBox="0 0 200 250" className="w-full h-48">
            <RegistrationEntry
              spiffeId="spiffe://acme.com/api"
              selectors={['k8s:ns:production', 'k8s:sa:api-server']}
              position={{ x: 100, y: 125 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Registration Entry - Highlighted */}
        <EntityCard title="Registration Entry (Matched)" status="verified">
          <svg viewBox="0 0 200 250" className="w-full h-48">
            <RegistrationEntry
              spiffeId="spiffe://acme.com/web"
              selectors={['docker:label:app=web']}
              highlighted={true}
              position={{ x: 100, y: 125 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Connection - Attempting */}
        <EntityCard title="Connection (Attempting)" status="verified">
          <svg viewBox="0 0 200 100" className="w-full h-24">
            <Connection
              from={{ x: 30, y: 50 }}
              to={{ x: 170, y: 50 }}
              status="attempting"
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Connection - Established */}
        <EntityCard title="Connection (Established)" status="verified">
          <svg viewBox="0 0 200 100" className="w-full h-24">
            <Connection
              from={{ x: 30, y: 50 }}
              to={{ x: 170, y: 50 }}
              status="established"
              label="mTLS"
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Connection - Rejected */}
        <EntityCard title="Connection (Rejected)" status="verified">
          <svg viewBox="0 0 200 100" className="w-full h-24">
            <Connection
              from={{ x: 30, y: 50 }}
              to={{ x: 170, y: 50 }}
              status="rejected"
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Connection - Bidirectional */}
        <EntityCard title="Connection (Bidirectional)" status="verified">
          <svg viewBox="0 0 200 100" className="w-full h-24">
            <Connection
              from={{ x: 30, y: 50 }}
              to={{ x: 170, y: 50 }}
              status="established"
              bidirectional={true}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Message - Request */}
        <EntityCard title="Message (Request)" status="verified">
          <svg viewBox="0 0 200 100" className="w-full h-24">
            <Message
              from={{ x: 30, y: 50 }}
              to={{ x: 170, y: 50 }}
              type="request"
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Message - Response */}
        <EntityCard title="Message (Response)" status="verified">
          <svg viewBox="0 0 200 100" className="w-full h-24">
            <Message
              from={{ x: 30, y: 50 }}
              to={{ x: 170, y: 50 }}
              type="response"
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Message - SVID */}
        <EntityCard title="Message (SVID)" status="verified">
          <svg viewBox="0 0 200 100" className="w-full h-24">
            <Message
              from={{ x: 30, y: 50 }}
              to={{ x: 170, y: 50 }}
              type="svid"
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Message - Attestation */}
        <EntityCard title="Message (Attestation)" status="verified">
          <svg viewBox="0 0 200 100" className="w-full h-24">
            <Message
              from={{ x: 30, y: 50 }}
              to={{ x: 170, y: 50 }}
              type="attestation"
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Attacker - Normal */}
        <EntityCard title="Attacker (Normal)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <Attacker
              label="Attacker"
              blocked={false}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>

        {/* Attacker - Blocked */}
        <EntityCard title="Attacker (Blocked)" status="verified">
          <svg viewBox="0 0 200 200" className="w-full h-40">
            <Attacker
              label="Attacker"
              blocked={true}
              position={{ x: 100, y: 100 }}
              animate={false}
            />
          </svg>
        </EntityCard>
      </div>

      {/* Composite Scene Demo */}
      <div className="mt-12">
        <h2 className="text-xl font-display font-semibold text-textPrimary mb-4">
          Composite Scene Demo
        </h2>
        <div className="bg-surface rounded-xl border border-textMuted/20 p-4">
          <svg viewBox="0 0 800 400" className="w-full h-96">
            {/* Trust Domain boundary */}
            <TrustDomain
              domain="acme.com"
              width={700}
              height={320}
              position={{ x: 400, y: 200 }}
              animate={false}
            />

            {/* SPIRE Server */}
            <SpireServer
              label="SPIRE Server"
              active={true}
              position={{ x: 400, y: 100 }}
              animate={false}
            />

            {/* SPIRE Agent */}
            <SpireAgent
              label="SPIRE Agent"
              active={true}
              position={{ x: 200, y: 250 }}
              animate={false}
            />

            {/* Connection from Agent to Server */}
            <Connection
              from={{ x: 200, y: 200 }}
              to={{ x: 400, y: 150 }}
              status="established"
              animate={false}
            />

            {/* Workloads */}
            <Workload
              label="web-app"
              attested={true}
              position={{ x: 100, y: 350 }}
              animate={false}
            />
            <Workload
              label="api-svc"
              attested={true}
              position={{ x: 300, y: 350 }}
              animate={false}
            />
            <Workload
              label="db-proxy"
              attested={false}
              showQuestionMark={true}
              position={{ x: 500, y: 350 }}
              animate={false}
            />

            {/* Connections from workloads to agent */}
            <Connection
              from={{ x: 100, y: 310 }}
              to={{ x: 200, y: 290 }}
              status="established"
              showArrow={false}
              animate={false}
            />
            <Connection
              from={{ x: 300, y: 310 }}
              to={{ x: 200, y: 290 }}
              status="established"
              showArrow={false}
              animate={false}
            />
            <Connection
              from={{ x: 500, y: 310 }}
              to={{ x: 200, y: 290 }}
              status="attempting"
              showArrow={false}
              animate={false}
            />

            {/* Trust Bundle */}
            <TrustBundle
              label="Trust Bundle"
              certCount={3}
              position={{ x: 600, y: 100 }}
              animate={false}
            />

            {/* Attacker outside */}
            <Attacker
              label="Attacker"
              blocked={true}
              position={{ x: 700, y: 300 }}
              animate={false}
            />
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 p-4 bg-surface rounded-lg border border-textMuted/20">
        <h2 className="text-lg font-semibold text-textPrimary mb-4">Status Legend</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-textSecondary">Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm text-textSecondary">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-textMuted" />
            <span className="text-sm text-textSecondary">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-attacker" />
            <span className="text-sm text-textSecondary">Critical (needs extra attention)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for entity cards
interface EntityCardProps {
  title: string;
  status: 'pending' | 'in-progress' | 'verified';
  critical?: boolean;
  children: React.ReactNode;
}

const EntityCard: React.FC<EntityCardProps> = ({ title, status, critical, children }) => {
  const statusColors = {
    pending: 'bg-textMuted',
    'in-progress': 'bg-warning',
    verified: 'bg-success',
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        critical ? 'border-attacker/50' : 'border-textMuted/20'
      } bg-surface`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-textPrimary">{title}</h3>
        <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status]}`} />
      </div>
      <div className="bg-background rounded-lg overflow-hidden">{children}</div>
    </div>
  );
};
